<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\ColorService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

/**
 * @OA\Schema(
 *     schema="ColorResource",
 *     type="object",
 *     title="Color Resource",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Red"),
 *     @OA\Property(property="code", type="string", example="#FF0000"),
 *     @OA\Property(property="items", type="integer", example=25, description="Number of products with this color"),
 *     @OA\Property(property="created_at", type="string", example="29/09/2025"),
 *     @OA\Property(property="updated_at", type="string", example="29/09/2025")
 * )
 */

class ColorController extends Controller
{
    protected $colorService;

    public function __construct(ColorService $colorService)
    {
        $this->colorService = $colorService;
    }

    /**
     * @OA\Get(
     *     path="/api/colors",
     *     summary="Get all available colors",
     *     tags={"Colors"},
     *     @OA\Response(
     *         response=200,
     *         description="List of colors",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Success"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/ColorResource")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="No colors found",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Colors fetch failed")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error"
     *     )
     * )
     */
    public function getAllColor()
    {
        try {
            $colors = $this->colorService->getActiveColors();

            if ($colors) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $colors,
                );
            }
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: "Colors " . self::FAILED_MESSAGE,
                statusCode: 400
            );
        } catch (Exception $e) {
            Log::error('Unable to fetch Colors: ' . $e->getMessage());
            return ApiResponse::error(
                status: "error",
                message: "Exception occured: " . $e->getMessage(),
                statusCode: 500
            );
        }
    }

    // /**
    //  * @OA\Post(
    //  *     path="/api/colors",
    //  *     summary="Create a new color",
    //  *     tags={"Colors"},
    //  *     @OA\RequestBody(
    //  *         required=true,
    //  *         @OA\JsonContent(
    //  *             required={"name","code"},
    //  *             @OA\Property(property="name", type="string", example="Blue"),
    //  *             @OA\Property(property="code", type="string", example="#0000FF")
    //  *         )
    //  *     ),
    //  *     @OA\Response(
    //  *         response=201,
    //  *         description="Color created successfully"
    //  *     ),
    //  *     @OA\Response(response=400, description="Validation failed"),
    //  *     @OA\Response(response=500, description="Server error")
    //  * )
    //  */
    // public function store(Request $request) {}

    // /**
    //  * @OA\Get(
    //  *     path="/api/colors/{id}",
    //  *     summary="Get color by ID",
    //  *     tags={"Colors"},
    //  *     @OA\Parameter(
    //  *         name="id",
    //  *         in="path",
    //  *         required=true,
    //  *         @OA\Schema(type="integer")
    //  *     ),
    //  *     @OA\Response(
    //  *         response=200,
    //  *         description="Color details",
    //  *         @OA\JsonContent(ref="#/components/schemas/ColorResource")
    //  *     ),
    //  *     @OA\Response(response=404, description="Color not found")
    //  * )
    //  */
    // public function show(string $id) {}

    // /**
    //  * @OA\Put(
    //  *     path="/api/colors/{id}",
    //  *     summary="Update an existing color",
    //  *     tags={"Colors"},
    //  *     @OA\Parameter(
    //  *         name="id",
    //  *         in="path",
    //  *         required=true,
    //  *         @OA\Schema(type="integer")
    //  *     ),
    //  *     @OA\RequestBody(
    //  *         required=true,
    //  *         @OA\JsonContent(
    //  *             @OA\Property(property="name", type="string", example="Green"),
    //  *             @OA\Property(property="code", type="string", example="#00FF00")
    //  *         )
    //  *     ),
    //  *     @OA\Response(response=200, description="Color updated successfully"),
    //  *     @OA\Response(response=404, description="Color not found"),
    //  *     @OA\Response(response=500, description="Server error")
    //  * )
    //  */
    // public function update(Request $request, string $id) {}

    // /**
    //  * @OA\Delete(
    //  *     path="/api/colors/{id}",
    //  *     summary="Delete a color",
    //  *     tags={"Colors"},
    //  *     @OA\Parameter(
    //  *         name="id",
    //  *         in="path",
    //  *         required=true,
    //  *         @OA\Schema(type="integer")
    //  *     ),
    //  *     @OA\Response(response=200, description="Color deleted successfully"),
    //  *     @OA\Response(response=404, description="Color not found")
    //  * )
    //  */
    // public function destroy(string $id) {}
}


