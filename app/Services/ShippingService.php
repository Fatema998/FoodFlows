<?php

namespace App\Services;

use App\Repository\ShippingRepository;
use App\Models\Shipping;

class ShippingService
{
    protected $shippingRepository;

    public function __construct(ShippingRepository $shippingRepository)
    {
        $this->shippingRepository = $shippingRepository;
    }

    /**
     * Create a new shipping record
     */
    public function createShipping($data)
    {
        return $this->shippingRepository->create($data);
    }

    /**
     * Update an existing shipping record
     */
    public function updateShipping( $id,  $data)
    {
        $shipping = $this->shippingRepository->findById($id);

        if (!$shipping) {
            return null; // Or throw an exception
        }

        return $this->shippingRepository->update($shipping, $data);
    }
}
