<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\ShippingCharge;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Http\Controllers\Controller;

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
        //
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
