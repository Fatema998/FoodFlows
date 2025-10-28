<?php

namespace App\Services;

use App\Repository\OrderRepository;
use App\Http\Resources\Order\OrderListResource;
use App\Http\Resources\Order\SingleOrderResource;

class OrderService
{
    /**
     * Create a new class instance.
     */
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository= $orderRepository;
    }

    // get all categories
    public function getAllOrders($limit=null){
       return OrderListResource::collection($this->orderRepository->getAllOrders($limit));
    }

    public function getOrderById($id){
       return new SingleOrderResource($this->orderRepository->getOrderById($id));
    }



}
