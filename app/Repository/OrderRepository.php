<?php

namespace App\Repository;

use App\Models\Order;

class OrderRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAllOrders($limit = null)
    {
         $query = Order::with(['shipping','status'])->latest();

        // ✅ If limit exists and is numeric, use pagination
        if (!empty($limit) && is_numeric($limit)) {
            return $query->paginate($limit);
        }

        // ✅ Otherwise, return all results without pagination
        return $query->get();
    }

    public function getOrderById($id){
        return Order::with([
            'shipping.shippingCharge', // load shipping and its related shippingCharge
            'status',
            'payment',
            'customer',
            'orderdetails.color',
            'orderdetails.size',
        ])->find($id);
    }
}
