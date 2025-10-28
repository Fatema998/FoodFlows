<?php

namespace App\Repository;

use App\Models\Payment;

class PaymentRepository
{
    public function __construct()
    {
        //
    }

    /**
     * Create a new payment record
     */
    public function create(array $data)
    {
        return Payment::create($data);
    }

    /**
     * Update an existing payment record
     */
    public function update($payment ,$data)
    {
        $payment->update($data);
        return $payment;
    }

    /**
     * Find payment by ID
     */
    public function findById(int $id): ?Payment
    {
        return Payment::find($id);
    }
}
