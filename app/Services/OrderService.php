<?php

namespace App\Services;

use Log;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;
use App\Services\PaymentService;
use App\Services\ShippingService;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Http\Resources\Order\OrderListResource;
use App\Http\Resources\Order\SingleOrderResource;

class OrderService
{
    protected $orderRepository;
    protected $userService;
    protected $shippingService;
    protected $paymentService;
    protected $productRepository;

    public function __construct(
        OrderRepository $orderRepository,
        UserService $userService,
        ShippingService $shippingService,
        PaymentService $paymentService,
        ProductRepository $productRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->userService = $userService;
        $this->shippingService = $shippingService;
        $this->paymentService = $paymentService;
        $this->productRepository = $productRepository;
    }

    // =========================
    // Helper: Resolve User
    // =========================
    protected function resolveUser(array $shipping)
    {
        $authUser = Auth::user();
        if ($authUser && $authUser->role !== 'admin') {
            return $authUser;
        }

        $user = $this->userService->getUserByPhone($shipping['phone'] ?? null)
              ?? $this->userService->getUserByEmail($shipping['email'] ?? null);

        if (!$user) {
            $userData = [
                'name' => $shipping['name'] ?? 'Guest User',
                'email' => $shipping['email'] ?? null,
                'phone' => $shipping['phone'] ?? null,
            ];
            $user = $this->userService->createUser($userData);
        }

        return $user;
    }

    // =========================
    // Get All Orders
    // =========================
    public function getAllOrders($limit = null)
    {
        return OrderListResource::collection(
            $this->orderRepository->getOrders($limit)
        );
    }
   public function getOrdersByUser($limit = null)
    {
        $authUser = Auth::user();

        return OrderListResource::collection(
            $this->orderRepository->getOrders($limit, $authUser,[
            'shipping.shippingCharge',
            'status',
            'payment',
            'customer',
            'orderdetails.color',
            'orderdetails.size',
        ])
        );
    }
 

    // =========================
    // Get Single Order
    // =========================
    public function getOrderById($id)
    {
        return new SingleOrderResource($this->orderRepository->findById($id));
    }

    // =========================
    // Create Order
    // =========================
    public function createOrder(array $data)
    {
        $shipping = $data['shipping'] ?? [];
        $orderItems = $data['items'] ?? [];

        DB::beginTransaction();
        try {
            $user = $this->resolveUser($shipping);
            $invoiceId = 'INV-' . date('Ymd-His');

            $orderData = [
                'customer_id' => $user->id,
                'invoice_id' => $invoiceId,
                'total_amount' => $data['total_amount'] ?? 0,
                'discount' => $data['discount'] ?? 0,
                'shipping_charge' => $data['shipping_charge'] ?? 0,
                'coupon_code'=> $data['coupon_code'] ?? "",
                'coupon_discount'=> $data['coupon_discount'] ?? 0,
                'order_status' => $data['order_status'] ?? 'pending',
            ];

            $order = $this->orderRepository->create($orderData);

            // Reserve stock and create order details
            foreach ($orderItems as $item) {
                $product = $this->productRepository->getProductById($item['product_id']);
                if (!$product || ($product->total_stock - $product->reserved_stock) < $item['qty']) {
                    throw new Exception("Insufficient stock for {$item['product_name']}");
                }

                $product->reserved_stock += $item['qty'];
                $product->save();

                $order->orderdetails()->create([
                    'product_id' => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'product_code' => $item['product_code'],
                    'purchase_price' => $item['purchase_price'],
                    'sell_price' => $item['sell_price'],
                    'qty' => $item['qty'],
                    'color_id' => $item['color_id'] ?? null,
                    'size_id' => $item['size_id'] ?? null,
                ]);
            }

            // Create shipping
            if (!empty($shipping)) {
                $shipping['customer_id'] = $user->id;
                $shipping['order_id'] = $order->id;
                $shipping['email'] = $user->email;
                $this->shippingService->createShipping($shipping);
            }

            // Handle payment
            $paymentMethod = strtolower($data['payment_method'] ?? 'cash');
            $paymentData = [
                'order_id' => $order->id,
                'customer_id' => $user->id,
                'total_amount' => $data['total_amount'] ?? 0,
                'payment_method' => $paymentMethod,
                'payment_status' => $data['payment_status'] ?? 'pending',
            ];

            if ($paymentMethod === 'bkash') {
                $this->paymentService->payWithBkash($paymentData);
            } elseif ($paymentMethod === 'nagad') {
                $this->paymentService->payWithNagad($paymentData);
            } else {
                $this->paymentService->createPayment($paymentData);
            }
            
            DB::commit();
            return $order->load(['orderdetails', 'customer', 'shipping', 'payment']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed: ' . $e->getMessage());
            throw new Exception('Failed to create order: ' . $e->getMessage());
        }
    }

    // =========================et rerum sequi
    // Update Order
    // =========================
    public function updateOrder($id, array $data)
    {
        $shipping = $data['shipping'] ?? [];
        $orderItems = $data['items'] ?? [];

        DB::beginTransaction();

        try {
            // 1️⃣ Find existing order
            $order = $this->orderRepository->findById($id);
            if (!$order) throw new Exception("Order not found.");

            // 2️⃣ Resolve user
            $user = $this->resolveUser($shipping);

            // 3️⃣ Update order main data
            $orderData = [
                'customer_id' => $user->id,
                'total_amount' => $data['total_amount'] ?? 0,
                'discount' => $data['discount'] ?? 0,
                'shipping_charge' => $data['shipping_charge'] ?? 0,
                'coupon_code' => $data['coupon_code'] ?? "",
                'coupon_discount' => $data['coupon_discount'] ?? 0,
                'order_status' => $data['order_status'] ?? $order->order_status,
            ];
            $this->orderRepository->update($id, $orderData);

            // 4️⃣ Handle order items with delta stock
            $existingItems = $order->orderdetails->keyBy('product_id'); // for easy lookup

            // Update or create items
            foreach ($orderItems as $item) {
                $product = $this->productRepository->getProductById($item['product_id']);
                $oldItem = $existingItems->get($item['product_id']);
                $oldQty = $oldItem->qty ?? 0;
                $delta = $item['qty'] - $oldQty; // positive: increase reserved, negative: decrease reserved

                // Check stock availability if increasing
                if ($delta > 0 && ($product->total_stock - $product->reserved_stock) < $delta) {
                    throw new Exception("Insufficient stock for {$item['product_name']}");
                }

                // Update reserved stock safely
                $product->reserved_stock = max($product->reserved_stock + $delta, 0);
                $product->save();

                // Update existing or create new order detail
                if ($oldItem) {
                    $oldItem->update([
                        'product_name' => $item['product_name'],
                        'product_code' => $item['product_code'],
                        'purchase_price' => $item['purchase_price'],
                        'sell_price' => $item['sell_price'],
                        'qty' => $item['qty'],
                        'color_id' => $item['color_id'] ?? null,
                        'size_id' => $item['size_id'] ?? null,
                    ]);
                } else {
                    $order->orderdetails()->create([
                        'product_id' => $item['product_id'],
                        'product_name' => $item['product_name'],
                        'product_code' => $item['product_code'],
                        'purchase_price' => $item['purchase_price'],
                        'sell_price' => $item['sell_price'],
                        'qty' => $item['qty'],
                        'color_id' => $item['color_id'] ?? null,
                        'size_id' => $item['size_id'] ?? null,
                    ]);
                }
            }

            // Delete removed items and release reserved stock
            $newProductIds = collect($orderItems)->pluck('product_id')->all();
            $removedItems = $order->orderdetails->whereNotIn('product_id', $newProductIds);

            foreach ($removedItems as $removedItem) {
                $product = $this->productRepository->getProductById($removedItem->product_id);
                $product->reserved_stock = max($product->reserved_stock - $removedItem->qty, 0);
                $product->save();
                $removedItem->delete();
            }

            // 5️⃣ Update shipping
            if (!empty($shipping)) {
                $shipping['customer_id'] = $user->id;
                $shipping['order_id'] = $order->id;
                $shipping['email'] = $user->email;

                if ($order->shipping) $order->shipping()->update($shipping);
                else $this->shippingService->createShipping($shipping);
            }

            // 6️⃣ Update payment
            $paymentMethod = strtolower($data['payment_method'] ?? 'cash');
            $paymentData = [
                'order_id' => $order->id,
                'customer_id' => $user->id,
                'total_amount' => $data['total_amount'] ?? 0,
                'payment_method' => $paymentMethod,
                'payment_status' => $data['payment_status'] ?? 'pending',
            ];

            if ($order->payment) $order->payment()->update($paymentData);
            else $this->paymentService->createPayment($paymentData);

            DB::commit();

            return $order->load(['orderdetails', 'customer', 'shipping', 'payment']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Order update failed: ' . $e->getMessage());
            throw new Exception('Failed to update order: ' . $e->getMessage());
        }
    }

    // =========================
    // Confirm Payment & Update Stock
    // =========================
    public function confirmOrderPayment($order)
    {
        DB::beginTransaction();
        try {
            foreach ($order->orderdetails as $item) {
                $product = $this->productRepository->getProductById($item->product_id);
                $product->total_stock = max($product->total_stock - $item->qty, 0);
                $product->reserved_stock = max($product->reserved_stock - $item->qty, 0);
                $product->sell_count += $item->qty;
                $product->save();
            }

            $order->order_status = 'success';
            $order->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Payment confirmation failed: ' . $e->getMessage());
            throw new Exception('Failed to confirm payment.');
        }
    }

    // =========================
    // Cancel Order & Release Stock
    // =========================
    public function cancelOrder($order)
    {
        DB::beginTransaction();
        try {
            foreach ($order->orderdetails as $item) {
                $product = $this->productRepository->getProductById($item->product_id);
                $product->reserved_stock = max($product->reserved_stock - $item->qty, 0);
                $product->save();
            }

            $order->order_status = 'cancelled';
            $order->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Order cancellation failed: ' . $e->getMessage());
            throw new Exception('Failed to cancel order.');
        }
    }
}
