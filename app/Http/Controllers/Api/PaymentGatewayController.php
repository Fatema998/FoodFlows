<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\f;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Models\PaymentGateway;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class PaymentGatewayController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    /**
     * @OA\Get(
     *     path="/api/payment-gateways",
     *     summary="Get active payment gateways",
     *     tags={"Payment Gateways"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Request processed successfully"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="Bkash"),
     *                     @OA\Property(property="type", type="string", example="bkash"),
     *                     @OA\Property(property="link", type="string", example="")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Payment gateway not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="PaymentGateway fetch failed")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */

    public function index()
    {
        //
        try {
            $paymentGateways = PaymentGateway::where('status', 1)->select('id', 'name', 'type', 'link')->get();

           if ($paymentGateways->isNotEmpty()) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $paymentGateways,
                        );
                }
                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: "PaymentGatway ". self::FAILED_MESSAGE,
                        statusCode: 400
                    );
                    
        } catch (Exception $e) {
            Log::error('Unable to fetch payment gateway: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(f $f)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(f $f)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, f $f)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(f $f)
    {
        //
    }
}
