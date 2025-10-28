<?php

namespace App\Repository;

use App\Models\Order;

class OrderRepository
{
    public function __construct()
    {
        //
    }

    /**
     * Get all orders, optionally paginated.
     */
    public function all($limit = null)
    {
        $query = Order::with(['shipping', 'status'])->latest();

        if (!empty($limit) && is_numeric($limit)) {
            return $query->paginate($limit);
        }

        return $query->get();
    }

    /**
     * Find order by ID with relations.
     */
    public function findById($id)
    {
        return Order::with([
            'shipping.shippingCharge',
            'status',
            'payment',
            'customer',
            'orderdetails.color',
            'orderdetails.size',
        ])->find($id);
    }

    public function existsByInvoiceId(string $invoiceId)
    {
        return Order::where('invoice_id', $invoiceId);
    }

    /**
     * Create a new order.
     */
    public function create(array $data)
    {
        return Order::create($data);
    }

    /**
     * Update an existing order.
     */
    public function update($id, array $data)
    {
        $order = $this->findById($id);
        $order->update($data);
        return $order;
    }

    /**
     * Delete an order.
     */
    public function delete($id)
    {
        $order = $this->findById($id);
        $order->delete();
        return $order;
    }
}
