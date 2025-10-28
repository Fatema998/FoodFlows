<?php

namespace App\Services;

use Log;
use Exception;
use App\Services\UserService;
use App\Services\PaymentService;
use App\Services\ShippingService;
use Illuminate\Support\Facades\DB;
use App\Repository\OrderRepository;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Order\OrderListResource;
use App\Http\Resources\Order\SingleOrderResource;

class OrderService
{
    protected $orderRepository;
    protected $userService;
    protected $shippingService;
    protected $paymentService;

    public function __construct(OrderRepository $orderRepository, UserService $userService, ShippingService $shippingService, PaymentService $paymentService)
    {
        $this->orderRepository = $orderRepository;
        $this->userService = $userService;
        $this->shippingService = $shippingService;
        $this->paymentService = $paymentService;

    }

    /**
     * Get all orders (optionally paginated) and transform to resource.
     */
    public function getAllOrders($limit = null)
    {
        return OrderListResource::collection($this->orderRepository->all($limit));
    }

    /**
     * Get single order by ID and transform to resource.
     */
    public function getOrderById($id)
    {
        return new SingleOrderResource($this->orderRepository->findById($id));
    }

    /**
     * Create a new order.
     */


    public function createOrder(array $data)
    {
        $shipping = $data['shipping'] ?? [];
        $orderItems = $data['items'] ?? [];

        DB::beginTransaction();

        try {
            // 1️⃣ Determine user (authenticated or guest)
            $authUser = Auth::user();
            if ($authUser && $authUser->role !== 'admin') {
                $user = $authUser;
            } else {
                $findUserByPhone = $this->userService->getUserByPhone($shipping['phone'] ?? null);
                $findUserByEmail = $this->userService->getUserByEmail($shipping['email'] ?? null);

                if (!$findUserByPhone && !$findUserByEmail) {
                    $userData = [
                        'name' => $shipping['name'] ?? 'Guest User',
                        'email' => $shipping['email'] ?? null,
                        'phone' => $shipping['phone'] ?? null,
                    ];
                    $user = $this->userService->createUser($userData);
                } else {
                    $user = $findUserByPhone ?? $findUserByEmail;
                }
            }

            // 2️⃣ Generate unique invoice ID
            $invoiceId = 'INV-' . date('Ymd-His') . '-' . mt_rand(100000, 999999);

            // 3️⃣ Prepare order data
            $orderData = [
                'customer_id' => $user->id,
                'invoice_id' => $invoiceId,
                'total_amount' => $data['total_amount'] ?? 0,
                'discount' => $data['discount'] ?? 0,
                'shipping_charge' => $data['shipping_charge'] ?? 0,
                'coupon_code'=> $data['coupon_code'] ?? "",
                'coupon_discount'=> $data['coupon_discount'] ?? 0,
                'order_status_id' => 1, // Pending
            ];

            // 4️⃣ Create order
            $order = $this->orderRepository->create($orderData);

            // 5️⃣ Create order details
            foreach ($orderItems as $item) {
                $order->orderdetails()->create([
                    'product_id' => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'product_code' => $item['product_code'],
                    'purchase_price' => $item['purchase_price'],
                    'sale_price' => $item['sale_price'],
                    'qty' => $item['qty'],
                    'color_id' => $item['color_id'] ?? null,
                    'size_id' => $item['size_id'] ?? null,
                ]);
            }

            // 6️⃣ Create shipping record
            if (!empty($shipping)) {
                $shipping['customer_id'] = $user->id;
                $shipping['order_id'] = $order->id;
                $shipping['email'] = $user->email;
                $this->shippingService->createShipping($shipping);
            }

            // 7️⃣ Handle payment
            $paymentMethod = strtolower($data['payment_method'] ?? 'cash');
            
            $paymentData = [
                'order_id' => $order->id,
                'customer_id' => $user->id,
                'total_amount' => $data['total_amount'] ?? 0,
                'payment_method' => $paymentMethod,
                'payment_status' => 'pending',
            ];

            switch ($paymentMethod) {
                case 'bkash':
                    $this->paymentService->payWithBkash($paymentData);
                    break;
                case 'nagad':
                    $this->paymentService->payWithNagad($paymentData);
                    break;
                case 'cash':
                default:
                    $this->paymentService->createPayment($paymentData);
            }

            // ✅ Commit transaction
            DB::commit();

            // 8️⃣ Return order with relationships
            return $order->load(['orderdetails', 'customer', 'shipping', 'payment']);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed: ' . $e->getMessage());
            throw new Exception('Failed to create order. Please try again.');
        }
    }






    /**
     * Update an existing order.
     */
    public function updateOrder($id, array $data)
    {
        return $this->orderRepository->update($id, $data);
    }

    /**
     * Delete an order.
     */
    public function deleteOrder($id)
    {
        return $this->orderRepository->delete($id);
    }
}
