<?php

namespace App\Repository;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

      /**
     * Apply dynamic filters to product query
     */

    protected function applyFilters($query, Request $request)
    {
        // ⚡ Best performance: apply simple indexed filters first

        // Category id
    
        if ($category = $request->query('category')) {
            // If value is "all" or empty, skip filtering
            if (strtolower($category) !== 'all' && $category !== '') {

                // If numeric → filter by ID
                if (is_numeric($category)) {
                    $query->where('products.category_id', $category);
                } 
                // If string → filter by slug
                else {
                    $query->join('categories as c', 'c.id', '=', 'products.category_id')
                        ->where('c.slug', $category)
                        ->select('products.*'); // Important to avoid ambiguous columns
                }
            }
        }



        // Subcategory
        if ($subcategoryId = $request->query('subcategory')) {
            $query->where('subcategory_id', $subcategoryId);
        }

        // Brand
        if ($brandId = $request->query('brand')) {
            $query->where('brand_id', $brandId);
        }

        // Price range (indexed)
        if ($minPrice = $request->query('min_price')) {
            $query->where('price', '>=', $minPrice);
        }

        if ($maxPrice = $request->query('max_price')) {
            $query->where('price', '<=', $maxPrice);
        }

        // Boolean filter mapping
        $filterMap = [
            'active'        => 'is_active',
            'trending'      => 'is_trending',
            'limited'       => 'is_limited',
            'todays_pick'   => 'is_todays_pick',
            'new_arrival'   => 'is_new_arrival',
            'featured'      => 'is_featured',
            'flash_deal'    => 'is_flash_deal',
        ];

        foreach ($filterMap as $frontend => $backend) {
            if (!is_null($value = $request->query($frontend))) {
                $query->where($backend, filter_var($value, FILTER_VALIDATE_BOOLEAN));
            }
        }

        // 🔥 Active Flash Deal
        if ($request->query('flash_deal') === 'active') {
            $now = now();
            $query->where('is_flash_deal', true)
                ->where('flash_deal_start', '<=', $now)
                ->where('flash_deal_end', '>=', $now);
        }

        // 🎨 Color Filter (indexed if product_variants has product_id + color index)
        // if ($color = $request->query('color')) {
        //     $query->whereExists(function ($q) use ($color) {
        //         $q->select(DB::raw(1))
        //             ->from('product_variants')
        //             ->whereColumn('product_variants.product_id', 'products.id')
        //             ->where('product_variants.color_id', $color);
        //     });
        // }

        if ($color = $request->query('color')) {
                $query->whereExists(function ($q) use ($color) {
                    $q->select(DB::raw(1))
                        ->from('product_variants')
                        ->join('colors', 'colors.id', '=', 'product_variants.color_id')
                        ->whereColumn('product_variants.product_id', 'products.id')
                        ->where('colors.name', $color); // or ->where('colors.slug', $color)
                });
            }
        // if ($colors = $request->query('color')) {
        //     $colors = is_array($colors) ? $colors : explode(',', $colors);

        //     $query->whereExists(function ($q) use ($colors) {
        //         $q->select(DB::raw(1))
        //         ->from('product_variants')
        //         ->join('colors', 'colors.id', '=', 'product_variants.color_id')
        //         ->whereColumn('product_variants.product_id', 'products.id')
        //         ->whereIn('colors.name', $colors);
        //     });
        // }


        // 👟 Size Filter (indexed if product_sizes has product_id + size index)
        // if ($size = $request->query('size')) {
        //     $query->whereExists(function ($q) use ($size) {
        //         $q->select(DB::raw(1))
        //             ->from('product_sizes')
        //             ->whereColumn('product_sizes.product_id', 'products.id')
        //             ->where('product_sizes.size_id', $size);
        //     });
        // }

        if ($size = $request->query('size')) {
            $query->whereExists(function ($q) use ($size) {
                $q->select(DB::raw(1))
                    ->from('product_sizes')
                    ->join('sizes', 'sizes.id', '=', 'product_sizes.size_id')
                    ->whereColumn('product_sizes.product_id', 'products.id')
                    ->where('sizes.name', $size); // or ->where('sizes.slug', $size)
            });
        }

            // ----------------------------
        // Size filter (multiple)
        // ----------------------------
        // if ($sizes = $request->query('size')) {
        //     $sizes = is_array($sizes) ? $sizes : explode(',', $sizes);

        //     $query->whereExists(function ($q) use ($sizes) {
        //         $q->select(DB::raw(1))
        //         ->from('product_sizes')
        //         ->join('sizes', 'sizes.id', '=', 'product_sizes.size_id')
        //         ->whereColumn('product_sizes.product_id', 'products.id')
        //         ->whereIn('sizes.name', $sizes);
        //     });
        // }

        // 🔍 Full Text Search (Best for 1M records)
        // Prefix Search – super fast – index will be used
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', $search . '%')
                ->orWhere('product_code', 'like', $search . '%');
            });
        }

        // ↕ Sorting
        if ($sort = $request->query('sort')) {
            switch ($sort) {

                case 'price_low_to_high':
                    $query->orderBy('price', 'asc');
                    break;

                case 'price_high_to_low':
                    $query->orderBy('price', 'desc');
                    break;

                case 'latest':
                    $query->orderBy('id', 'desc'); // fastest
                    break;

                case 'oldest':
                    $query->orderBy('id', 'asc');
                    break;

                // 🔤 A → Z
                case 'title_asc':
                    $query->orderBy('title', 'asc');
                    break;

                // 🔠 Z → A
                case 'title_desc':
                    $query->orderBy('title', 'desc');
                    break;
            }
        }

        return $query;
    }



    public function getAllProducts(Request $request, $limit = 10)
    {
        $query = Product::with(['brand', 'category', 'subcategory'])
                ->orderBy('created_at', 'desc');

        $this->applyFilters($query, $request);

        return $limit ? $query->paginate($limit) : $query->get();
        // return $query->paginate($limit);
    }

    // Get all active products
    public function getActiveProducts(Request $request, $limit = 10)
    {
        $query = Product::with(['sizes', 'variants'])
                    ->where('products.is_active', true)   // FIXED
                    ->orderBy('products.created_at', 'desc'); // FIXED

        $this->applyFilters($query, $request);

        return $limit ? $query->paginate($limit) : $query->get();
    }



    // Get product by ID
    public function getProductById($id){
        return Product::with(['brand','category', 'subcategory', 'sizes', 'variants' ])
                    ->where('id', $id)
                    ->first();          
    }
    
    // Get product by slug
    public function getProductBySlug($slug){
        return Product::with(['brand','category', 'subcategory', 'sizes', 'variants' ])
                    ->where('slug', $slug)
                    ->first();
    }

    // best selling products
    public function bestSellingProducts($limit){
          return  Product::with(['sizes', 'variants'])
                    ->where('is_active', true)
                    ->orderBy('sell_count', 'desc')
                     ->take($limit) // Limit to top 10 best sellers
                    ->get();
    }                

    public function getTypeWiseProducts($column, $limit = 10)
    {
        return Product::where($column, true)
            ->where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->take($limit)
            ->get();
    }

    // create product
    public function createProduct($data){
        return Product::create($data);
    }

    // ✅ Update product
    public function updateProduct($data, $id)
    {
        $product = $this->getProductById($id);
        $product->update($data);
        return $product;
    }

    // ✅ Delete product
    public function deleteProduct($id)
    {
        $product = $this->getProductById($id);
        $product->delete(); 
        return $product;
    }
    
}
