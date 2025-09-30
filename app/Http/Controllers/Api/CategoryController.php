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
 *     @OA\Property(property="items", type="integer", example=25),
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


    //category wise products  with details by slug or id 

    /**
 * @OA\Get(
 *     path="/api/categories/{identifier}/products",
 *     tags={"Categories"},
 *     summary="Get products of a category by ID or slug",
 *     description="Fetches all products under a category using either category ID (numeric) or slug (string).",
 *     @OA\Parameter(
 *         name="identifier",
 *         in="path",
 *         required=true,
 *         description="Category ID (numeric) or slug (string)",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Category products fetched successfully",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="Data fetched successfully"),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="name", type="string", example="Electronics"),
 *                 @OA\Property(property="slug", type="string", example="electronics"),
 *                 @OA\Property(
 *                     property="products",
 *                     type="array",
 *                     @OA\Items(
 *                         type="object",
 *                         @OA\Property(property="id", type="integer", example=101),
 *                         @OA\Property(property="name", type="string", example="iPhone 15"),
 *                         @OA\Property(property="price", type="number", format="float", example=999.99),
 *                         @OA\Property(property="status", type="string", example="active")
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Category not found",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Category fetch failed")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Exception occurred: Something went wrong")
 *         )
 *     )
 * )
 */

    public function getCategoryProducts($identifier)
    {
        try {
            if (is_numeric($identifier)) {
                // call service directly instead of controller method
                $category = $this->categoryService->getCategoryProductsById($identifier);
            } else {
                $category = $this->categoryService->getCategoryProductsBySlug($identifier);
            }

            if ($category) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $category
                );
            }

            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: "Category " . self::FAILED_MESSAGE,
                statusCode: 400
            );

        } catch (\Exception $e) {
            Log::error('Unable to fetch category: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occurred: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }

}
