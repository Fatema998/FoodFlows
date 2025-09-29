<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductListResource;
use App\Http\Resources\Product\SingleProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::with(['sizes', 'variants'])
                    ->where('is_active', true)
                    ->orderBy('created_at', 'desc')
                    ->get();
        return response()->json(ProductListResource::collection($products));
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

    
    public function show(string $slug)
    {
        // Find product by slug with related data
        $product = Product::with(['brand','category', 'subcategory', 'sizes', 'variants' ])
                    ->where('slug', $slug)
                    ->where('is_active', true)
                    ->first();
        return response()->json(new SingleProductResource($product));
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
