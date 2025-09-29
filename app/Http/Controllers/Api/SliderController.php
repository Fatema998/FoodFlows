<?php

namespace App\Http\Controllers\Api;

use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\SliderService;
use App\Http\Controllers\Controller;

class SliderController extends Controller
{
    //
    protected $sliderService;
    
    public function __construct(SliderService $sliderService)
    {
        $this->sliderService = $sliderService;
    }

    // Get Sliders 


        /**
 * @OA\Get(
 *     path="/api/sliders",
 *     summary="Get all sliders",
 *     tags={"Sliders"},
 *     @OA\Parameter(
 *         name="limit",
 *         in="query",
 *         description="Number of sliders to return (optional, default is 3)",
 *         required=false,
 *         @OA\Schema(type="integer", default=3)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="Success"),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="title", type="string", example="Big Sale"),
 *                     @OA\Property(property="subtitle", type="string", example="Up to 50% off"),
 *                     @OA\Property(property="image", type="string", example="https://example.com/slider1.jpg"),
 *                     @OA\Property(property="button_text", type="string", example="Shop Now"),
 *                     @OA\Property(property="link", type="string", example="https://example.com/products"),
 *                     @OA\Property(property="created_at", type="string", example="29/09/2025"),
 *                     @OA\Property(property="updated_at", type="string", example="29/09/2025")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to fetch sliders",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Slider fetch failed")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Exception occurred: ...")
 *         )
 *     )
 * )
 */
    public function getAllSlider(Request $request){
        try {
             $limit = (int) $request->query('limit', 3); // Default limit is 10 if not provided

            $sliders = $this->sliderService->getSliders($limit);

            if ($sliders) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $sliders,
                        );
                }
                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: "Product ". self::FAILED_MESSAGE,
                        statusCode: 400
                    );
                    
        } catch (Exception $e) {
            Log::error('Unable to fetch Sliders: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }


}
