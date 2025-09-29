<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\ProductService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

/**
 * @OA\Schema(
 *     schema="ProductListResource",
 *     type="object",
 *     title="Product List Resource",
 *     description="Product resource response",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="T-shirt"),
 *     @OA\Property(property="slug", type="string", example="t-shirt"),
 *     @OA\Property(property="price", type="number", format="float", example=1200.50),
 *     @OA\Property(property="discount", type="number", format="float", example=100.00),
 *     @OA\Property(property="sold_price", type="number", format="float", example=1100.50),
 *     @OA\Property(property="quantity", type="integer", example=20),
 *     @OA\Property(property="is_trending", type="boolean", example=true),
 *     @OA\Property(property="is_limited", type="boolean", example=false),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 *     @OA\Property(property="is_featured", type="boolean", example=false),
 *     @OA\Property(property="is_flash_deal", type="boolean", example=true),
 *     @OA\Property(property="flash_deal_start", type="string", format="date-time"),
 *     @OA\Property(property="flash_deal_end", type="string", format="date-time"),
 *     @OA\Property(
 *         property="sizes",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="name", type="string", example="M")
 *         )
 *     ),
 *     @OA\Property(
 *         property="variants",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(
 *                 property="color",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="name", type="string", example="Red"),
 *                 @OA\Property(property="code", type="string", example="#FF0000")
 *             ),
 *             @OA\Property(property="image", type="string", example="http://example.com/image.jpg")
 *         )
 *     ),
 *     @OA\Property(property="created_at", type="string", example="29/09/2025"),
 *     @OA\Property(property="updated_at", type="string", example="29/09/2025")
 * )
 *
 * @OA\Schema(
 *     schema="SingleProductResource",
 *     type="object",
 *     title="Single Product Resource",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Premium Cotton T-Shirt"),
 *     @OA\Property(property="slug", type="string", example="premium-cotton-t-shirt"),
 *     @OA\Property(property="price", type="number", format="float", example=1200),
 *     @OA\Property(property="discount", type="number", format="float", example=200),
 *     @OA\Property(property="sold_price", type="number", format="float", example=1000),
 *     @OA\Property(property="product_code", type="string", example="TSHIRT-2025"),
 *     @OA\Property(property="sell_count", type="integer", example=500),
 *     @OA\Property(property="quantity", type="integer", example=50),
 *     @OA\Property(property="main_thumbnail", type="string", example="https://example.com/images/tshirt.png"),
 *     @OA\Property(property="long_descriptions", type="string", example="This is a long description."),
 *     @OA\Property(property="short_description", type="string", example="Short description."),
 *     @OA\Property(property="materials", type="string", example="100% Cotton"),
 *     @OA\Property(property="is_trending", type="boolean", example=true),
 *     @OA\Property(property="is_limited", type="boolean", example=false),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 *     @OA\Property(property="is_featured", type="boolean", example=false),
 *     @OA\Property(property="is_flash_deal", type="boolean", example=false),
 *     @OA\Property(property="flash_deal_start", type="string", format="date-time", example="2025-01-01 00:00:00"),
 *     @OA\Property(property="flash_deal_end", type="string", format="date-time", example="2025-01-10 23:59:59"),
 *     @OA\Property(
 *         property="brand",
 *         type="object",
 *         nullable=true,
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Nike"),
 *         @OA\Property(property="slug", type="string", example="nike")
 *     ),
 *     @OA\Property(
 *         property="category",
 *         type="object",
 *         nullable=true,
 *         @OA\Property(property="id", type="integer", example=2),
 *         @OA\Property(property="name", type="string", example="Clothing"),
 *         @OA\Property(property="slug", type="string", example="clothing")
 *     ),
 *     @OA\Property(
 *         property="subcategory",
 *         type="object",
 *         nullable=true,
 *         @OA\Property(property="id", type="integer", example=3),
 *         @OA\Property(property="name", type="string", example="T-Shirts"),
 *         @OA\Property(property="slug", type="string", example="t-shirts")
 *     ),
 *     @OA\Property(
 *         property="sizes",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="name", type="string", example="XL")
 *         )
 *     ),
 *     @OA\Property(
 *         property="variants",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=10),
 *             @OA\Property(
 *                 property="color",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=5),
 *                 @OA\Property(property="name", type="string", example="Red"),
 *                 @OA\Property(property="code", type="string", example="#FF0000")
 *             ),
 *             @OA\Property(property="image", type="string", example="https://example.com/variant-red.png")
 *         )
 *     ),
 *     @OA\Property(property="meta_title", type="string", example="Buy Premium Cotton T-Shirt"),
 *     @OA\Property(property="meta_description", type="string", example="This is the best premium cotton t-shirt."),
 *     @OA\Property(property="meta_keywords", type="string", example="tshirt, cotton, fashion"),
 *     @OA\Property(property="created_at", type="string", example="29/09/2025"),
 *     @OA\Property(property="updated_at", type="string", example="29/09/2025")
 * )
 */
class ProductController extends Controller
{
    protected $productService;
    
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="Get all products",
     *     tags={"Products"},
     *     @OA\Response(
     *         response=200,
     *         description="List of products",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Success"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/ProductListResource")
     *             )
     *         )
     *     )
     * )
     */
    public function getAllProducts()
    {
        try {

            $products = $this->productService->getProducts();

            if ($products) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $products,
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: "Product ". self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Unable to fetch product: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }


    /**
     * @OA\Get(
     *     path="/api/products/{slug}",
     *     summary="Get a product by slug",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="slug",
     *         in="path",
     *         required=true,
     *         description="The slug of the product",
     *         @OA\Schema(type="string", example="samsung-galaxy-s23")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product details",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Success"),
     *             @OA\Property(property="data", ref="#/components/schemas/SingleProductResource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Product not found",
     *         @OA\JsonContent(type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Product not found")
     *         )
     *     )
     * )
     */
    public function getProductBySlug(string $slug)
    {
        try {
            $product = $this->productService->getProductBySlug($slug);

            if ($product) {
                 return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $product,
                            statusCode: self::SUCCESS, 
                        );
            }

            return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: "Product ". self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Unable to fetch product: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }
   
    /**
     * @OA\Get(
     *     path="/api/products/best-sellers",
     *     summary="Best Seller  products",
     *     tags={"Products"},
     *     @OA\Response(
     *         response=200,
     *         description="Best Seller  products",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Success"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/ProductListResource")
     *             )
     *         )
     *     )
     * )
     */
    public function bestSellingProducts(){
        try {

            $responseProducts = $this->productService->bestSellingProducts();

            if ($responseProducts) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $responseProducts,
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: "Product ". self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Unable to fetch product: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }

    /**
     * @OA\Get(
     *     path="/api/products/wise",
     *     summary="Get products by type or all types",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="type",
     *         in="query",
     *         required=false,
     *         description="Filter by product type (trending, todays_pick, new_arrival, featured, flash_deal)",
     *         @OA\Schema(type="string", example="trending")
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         required=false,
     *         description="Limit number of products returned (default 10)",
     *         @OA\Schema(type="integer", example=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Products fetched successfully"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 description="Products grouped by type if 'type' not provided",
     *                 @OA\Property(
     *                     property="trending",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/ProductListResource")
     *                 ),
     *                 @OA\Property(
     *                     property="todays_pick",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/ProductListResource")
     *                 ),
     *                 @OA\Property(
     *                     property="new_arrival",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/ProductListResource")
     *                 ),
     *                 @OA\Property(
     *                     property="featured",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/ProductListResource")
     *                 ),
     *                 @OA\Property(
     *                     property="flash_deal",
     *                     type="array",
     *                     @OA\Items(ref="#/components/schemas/ProductListResource")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Exception occurred")
     *         )
     *     )
     * )
     */
    public function wiseProducts(Request $request)
    {
        try {
            $limit = (int) $request->query('limit', 10);
            $type  = $request->query('type');

            if ($type) {
                $products = $this->productService->getProductsByType($type, $limit);
            } else {
                $products = $this->productService->getWiseProducts($limit);
            }

            return ApiResponse::success(
                status: self::SUCCESS_STATUS,
                message: self::SUCCESS_MESSAGE,
                data: $products
            );

        } catch (\Exception $e) {
            Log::error('Unable to fetch products: ' . $e->getMessage() . ' - Line: ' . $e->getLine());
            return ApiResponse::error(
                status: "error",
                message: "Exception occurred: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }


}
