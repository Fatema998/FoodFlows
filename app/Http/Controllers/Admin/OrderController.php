<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\ShippingCharge;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $orderService;
    protected $productService;

    public function __construct(OrderService $orderService,ProductService $productService)
    {
        $this->orderService = $orderService;
        $this->productService = $productService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        try {
            // Get paginated brand list
            $limit = (int) $request->query('limit', 10);
            $orders = $this->orderService->getAllOrders($limit);

            // Render brand index page
            return Inertia::render('AdminDashboard/Order/Index', [
                'orders' => $orders,
            ]);
            
        } catch (Exception $e) {
            // Handle any exception gracefully
            return redirect()->back()->with('error', 'Failed to load orders: ' . $e->getMessage());
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $products = $this->productService->getActiveProducts();

        return Inertia::render('AdminDashboard/Order/Create',[
            'products'=>$products,
            'shippingCharge'=>ShippingCharge::all(),
         ]);
    }



    
    /**
     * Store a newly created resource in storage.
     */
        public function store(Request $request)
    {
        // 1️⃣ Validate request
        $validator = Validator::make($request->all(), [
            'shipping.name' => 'required|string|max:255',
            'shipping.phone' => 'required|string|max:20',
            'shipping.email' => 'nullable|email|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.product_name' => 'required|string',
            'items.*.product_code' => 'required|string',
            'items.*.purchase_price' => 'required|numeric|min:0',
            'items.*.sale_price' => 'required|numeric|min:0',
            'items.*.qty' => 'required|integer|min:1',
            'payment_method' => 'nullable|string|in:bkash,nagad,cash,cash_on_delivery',
            'total_amount' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'shipping_charge' => 'nullable|numeric|min:0',
            'coupon_code' => 'nullable|string|max:50',
            'coupon_discount' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // 2️⃣ Create order
            $order = $this->orderService->createOrder($request->all());

            return response()->json([
                'message' => 'Order created successfully',
                'data' => $order
            ], 201);

            // return redirect()->route('admin.order.index');

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
         $products = $this->productService->getActiveProducts();
         $order = $this->orderService->getOrderById($id);
         
         return Inertia::render('AdminDashboard/Order/Edit',[
            'products'=>$products,
            'shippingCharge'=>ShippingCharge::all(),
            'order' =>$order
         ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        // dd($request->all());
         $this->orderService->updateOrder($id,$request);

        return response(
            $request['items']
        );
        return Inertia::render('AdminDashboard/Order/Index');
            
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function invoice($invoice_id){
        $order = Order::where(['invoice_id'=>$invoice_id])->with('orderdetails','payment','shipping','customer')->firstOrFail();
        return Inertia::render('AdminDashboard/Order/Invoice', [
                'order' => $order,
            ]);

        // return view('backend.order.invoice',compact('order'));
    }
}
