<?php

namespace App\Repository;

use App\Models\Shipping;

class ShippingRepository
{
    public function __construct()
    {
        //
    }

    /**
     * Create a new shipping record
     */
    public function create( $data)
    {
        return Shipping::create($data);
    }

    /**
     * Update an existing shipping record
     */
    public function update( $shipping,  $data)
    {
        $shipping->update($data);
        return $shipping;
    }

    /**
     * Find shipping by ID
     */
    public function findById(int $id): ?Shipping
    {
        return Shipping::find($id);
    }
}
