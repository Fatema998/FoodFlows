<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\BrandService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class BrandController extends Controller
{
    

    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }
    
    /**
     * Display a listing of the resource.
     */


    /**
 * @OA\Get(
 *     path="/api/brands",
 *     summary="Get all brands",
 *     tags={"Brands"},
 *     @OA\Parameter(
 *         name="limit",
 *         in="query",
 *         description="Number of brands to return (optional, default is 10)",
 *         required=false,
 *         @OA\Schema(type="integer", default=10)
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
 *                     @OA\Property(property="name", type="string", example="Nike"),
 *                     @OA\Property(property="slug", type="string", example="nike"),
 *                     @OA\Property(property="image", type="string", example="https://example.com/images/nike.png"),
 *                     @OA\Property(property="created_at", type="string", example="29/09/2025"),
 *                     @OA\Property(property="updated_at", type="string", example="29/09/2025")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Failed to fetch brands",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Product fetch failed")
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

   public function getAllBrand(Request $request){
        try {
             $limit = (int) $request->query('limit', 10); // Default limit is 10 if not provided

            $brands = $this->brandService->getBrands($limit);

            if ($brands) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $brands,
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
