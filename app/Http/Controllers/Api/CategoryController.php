<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Product;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\CategoryService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;


/**
 * @OA\Schema(
 *     schema="CategoryListResource",
 *     type="object",
 *     title="Category Resource",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Clothing"),
 *     @OA\Property(property="slug", type="string", example="clothing"),
 *     @OA\Property(property="image", type="string", example="https://example.com/images/clothing.png"),
 *     @OA\Property(property="products_count", type="integer", example=25),
 *     @OA\Property(
 *         property="children",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/CategoryListResource")
 *     ),
 *     @OA\Property(property="created_at", type="string", example="29/09/2025"),
 *     @OA\Property(property="updated_at", type="string", example="29/09/2025")
 * )
 */

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }
    
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="Get all categories with optional limit",
     *     tags={"Categories"},
     *     @OA\Response(
     *         response=200,
     *         description="List of categories",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Success"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/CategoryListResource")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="No categories found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Product fetch failed")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Exception occured: Internal Server Error")
     *         )
     *     )
     * )
     */
    public function getAllCategories(Request $request){
       
      try {
        
          $categories = $this->categoryService->getCategories();

            if ($categories) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $categories,
                        );
                }
                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: "Product ". self::FAILED_MESSAGE,
                        statusCode: 400
                    );
                    
        } catch (Exception $e) {
            Log::error('Unable to fetch Brands: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }

    }


}
