<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Models\ShippingCharge;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ShippingChargeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *     path="/api/shipping-charges",
     *     summary="Get active shipping charges",
     *     tags={"Shipping Charges"},
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
     *                     @OA\Property(property="name", type="string", example="Inside City"),
     *                     @OA\Property(property="amount", type="number", example=60)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Shipping charges not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Shipping charges fetch failed")
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
        try {
            $shippingCharges = ShippingCharge::where('status', 1)
                ->select('id', 'name', 'amount')
                ->get();

            if ($shippingCharges->isEmpty()) {
                return ApiResponse::error(
                    status: self::ERROR_STATUS,
                    message: 'Shipping charges ' . self::FAILED_MESSAGE,
                    statusCode: 404
                );
            }

            return ApiResponse::success(
                status: self::SUCCESS_STATUS,
                message: self::SUCCESS_MESSAGE,
                data: $shippingCharges
            );

        } catch (Exception $e) {
            Log::error('Unable to fetch Shipping charges: ' . $e->getMessage());

            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: 'Exception occurred',
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
    public function show(cf $cf)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cf $cf)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, cf $cf)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cf $cf)
    {
        //
    }
}
