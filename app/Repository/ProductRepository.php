<?php

namespace App\Repository;

use App\Models\Product;

class ProductRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    // Get all products
    public function getProducts(){
       return  Product::with(['sizes', 'variants'])
                    ->where('is_active', true)
                    ->orderBy('created_at', 'desc')
                    ->get();
    }

    // Get product by ID
    public function getProductById($id){
        return Product::with(['brand','category', 'subcategory', 'sizes', 'variants' ])
                    ->where('id', $id)
                    ->where('is_active', true)
                    ->first();          

    }
    
    // Get product by slug
    public function getProductBySlug($slug){
        return Product::with(['brand','category', 'subcategory', 'sizes', 'variants' ])
                    ->where('slug', $slug)
                    ->where('is_active', true)
                    ->first();

        // return Product::with(['brand','category', 'subcategory', 'sizes', 'variants'])
        //     ->where('is_active', true)
        //     ->whereRaw("MATCH(slug) AGAINST(? IN NATURAL LANGUAGE MODE)", [$slug])
        //     ->first();
    }

    // best selling products
    public function bestSellingProducts(){
          return  Product::with(['sizes', 'variants'])
                    ->where('is_active', true)
                    ->orderBy('sold_count', 'desc')
                    ->take(10)  // Limit to top 10 best sellers
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


}
