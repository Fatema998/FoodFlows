<?php

namespace App\Services;

use App\Repository\PaymentRepository;
use App\Models\Payment;

class PaymentService
{
    protected $paymentRepository;

    public function __construct(PaymentRepository $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }

    /**
     * Create a new payment record
     */
    public function createPayment($data)
    {
        return $this->paymentRepository->create($data);
    }

    /**
     * Update an existing payment record
     */
    public function updatePayment($id, $data)
    {
        $payment = $this->paymentRepository->findById($id);

        if (!$payment) {
            return null; // Or throw an exception
        }

        return $this->paymentRepository->update($payment, $data);
    }
}
