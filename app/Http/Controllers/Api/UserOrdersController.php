<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\OrderService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;




class UserOrdersController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    
    /**
     * @OA\Get(
     *     path="/api/user/orders",
     *     summary="Get authenticated user's orders",
     *     description="Returns a list of orders belonging to the logged-in user.",
     *     tags={"User_Profile"},
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         required=false,
     *         description="Number of orders per page",
     *         @OA\Schema(type="integer", example=10)
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="User orders fetched successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Orders retrieved"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="per_page", type="integer", example=10),
     *                 @OA\Property(property="total", type="integer", example=25),
     *                 @OA\Property(
     *                     property="data",
     *                     type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=101),
     *                         @OA\Property(property="invoice_no", type="string", example="INV-2024-0012"),
     *                         @OA\Property(property="total_amount", type="number", format="float", example=1500.75),
     *                         @OA\Property(property="payment_method", type="string", example="Online"),
     *                         @OA\Property(property="status", type="string", example="Delivered"),
     *
     *                         @OA\Property(
     *                             property="shipping",
     *                             type="object",
     *                             @OA\Property(property="address", type="string", example="Dhaka, Bangladesh"),
     *                             @OA\Property(property="shipping_charge", type="number", example=60)
     *                         ),
     *
     *                         @OA\Property(
     *                             property="orderdetails",
     *                             type="array",
     *                             @OA\Items(
     *                                 @OA\Property(property="product_name", type="string", example="T-Shirt"),
     *                                 @OA\Property(property="quantity", type="integer", example=2),
     *                                 @OA\Property(property="price", type="number", example=750),
     *                                 @OA\Property(property="color", type="string", example="Black"),
     *                                 @OA\Property(property="size", type="string", example="M")
     *                             )
     *                         )
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Failed to fetch user orders",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Failed to fetch orders")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Server error while fetching orders",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Exception occurred")
     *         )
     *     )
     * )
     */

    public function orders(Request $request) {
        try {
            $limit = (int) $request->query('limit');
            $orders = $this->orderService->getOrdersByUser($limit);

            if ($orders) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $orders,
                );
            }

            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: "Product ". self::FAILED_MESSAGE,
                statusCode: 400
            );
                        
        } catch (Exception $e) {
            Log::error('Unable to fetch user orders: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }


}
