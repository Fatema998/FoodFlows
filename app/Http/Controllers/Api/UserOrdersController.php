<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\OrderService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;




class UserOrdersController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    
    /**
     * @OA\Get(
     *     path="/api/orders/user",
     *     summary="Get authenticated user's orders",
     *     description="Returns a list of orders belonging to the logged-in user.",
     *     tags={"Orders"},
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


    /**
     * @OA\Post(
     *     path="/api/orders",
     *     summary="Create a new customer order",
     *     description="Creates a customer order with shipping details, product items, variations (colors & sizes), discounts, coupons, and payment information.",
     *     tags={"Orders"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             required={"shipping","items","total_amount"},
     *
     *             @OA\Property(
     *                 property="shipping",
     *                 type="object",
     *                 required={"name","phone","address"},
     *                 @OA\Property(property="name", type="string", example="Rafiul Islam"),
     *                 @OA\Property(property="email", type="string", nullable=true, example="rafi@example.com"),
     *                 @OA\Property(property="phone", type="string", example="01700000000"),
     *                 @OA\Property(property="address", type="string", example="Dhaka, Bangladesh"),
     *                 @OA\Property(property="shipping_charge_id", type="integer", example=1)
     *             ),
     *
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 minItems=1,
     *                 @OA\Items(
     *                     type="object",
     *                     required={"product_id","product_name","product_code","purchase_price","sell_price","qty"},
     *
     *                     @OA\Property(property="product_id", type="integer", example=1),
     *                     @OA\Property(property="product_name", type="string", example="Premium T-Shirt"),
     *                     @OA\Property(property="product_code", type="string", example="TSH-2025"),
     *                     @OA\Property(property="purchase_price", type="number", example=500),
     *                     @OA\Property(property="sell_price", type="number", example=750),
     *                     @OA\Property(property="qty", type="integer", example=2),
     *
     *
     *                     @OA\Property(property="size_id", type="integer", example=1),
     *                     @OA\Property(property="color_id", type="integer", example=1)
     *                 )
     *             ),
     *
     *             @OA\Property(property="discount", type="number", nullable=true, example=100),
     *             @OA\Property(property="shipping_charge", type="number", nullable=true, example=60),
     *             @OA\Property(property="coupon_code", type="string", nullable=true, example="NEWYEAR25"),
     *             @OA\Property(property="coupon_discount", type="number", nullable=true, example=25),
     *             @OA\Property(property="payment_method", type="string", nullable=true, enum={"bkash","nagad","cash","cash_on_delivery"}, example="cash"),
     *             @OA\Property(property="total_amount", type="number", example=1500)
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Order created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Order created successfully"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=400,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Validation failed"),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Server internal error")
     *         )
     *     )
     * )
     */

    public function createCustomerOrder(Request $request){
         // 1️⃣ Validate request
        $validator = Validator::make($request->all(), [
            'shipping.name' => 'required|string|max:255',
            'shipping.phone' => 'required|string|max:20',
            'shipping.email' => 'nullable|email|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.product_name' => 'required|string',
            'items.*.product_code' => 'required|string',
            'items.*.purchase_price' => 'required|numeric|min:0',
            'items.*.sell_price' => 'required|numeric|min:0',
            'items.*.qty' => 'required|integer|min:1',
            'payment_method' => 'nullable|string|in:bkash,nagad,cash,cash_on_delivery',
            'total_amount' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'shipping_charge' => 'nullable|numeric|min:0',
            'coupon_code' => 'nullable|string|max:50',
            'coupon_discount' => 'nullable|numeric|min:0',
        ]);
      
        if ($validator->fails()) {
            Log::error('Order Validation Failed:', $validator->errors()->toArray());
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::VALIDATION_ERROR_MESSAGE,
                statusCode: self::VALIDATION_ERROR
             );
        }

        try {
            // 2️⃣ Create order
            $order = $this->orderService->createOrder($request->all());

             return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $order
                );

        } catch (Exception $e) {
             Log::error('Unable to fetch profile: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 500
            );
            return redirect()->back()->with('error', 'Failed to create order.  '  . $e->getMessage());
        }
    }
}
