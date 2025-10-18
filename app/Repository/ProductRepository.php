<?php

namespace App\Repository;

use App\Models\Product;
use Illuminate\Http\Request;

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
        // ✅ Mapping frontend → backend filter keys
        $filterMap = [
            'active'        => 'is_active',
            'trending'      => 'is_trending',
            'limited'       => 'is_limited',
            'todays_pick'   => 'is_todays_pick',
            'new_arrival'   => 'is_new_arrival',
            'featured'      => 'is_featured',
            'flash_deal'    => 'is_flash_deal',
        ];

        // 🔍 Search by title or code
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhere('product_code', 'like', "%{$search}%");
            });
        }

        // 📅 Date range filters
        if ($startDate = $request->query('start_date')) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        if ($endDate = $request->query('end_date')) {
            $query->whereDate('created_at', '<=', $endDate);
        }

        // 🏷️ Category and subcategory filters
        if ($categoryId = $request->query('category')) {
            $query->where('category_id', $categoryId);
        }
        if ($subcategoryId = $request->query('subcategory')) {
            $query->where('subcategory_id', $subcategoryId);
        }

        // 🏢 Brand filter
        if ($brandId = $request->query('brand')) {
            $query->where('brand_id', $brandId);
        }

        // ⚙️ Boolean filters (frontend key mapped to backend)
        foreach ($filterMap as $frontend => $backend) {
            if (!is_null($value = $request->query($frontend))) {
                $query->where($backend, filter_var($value, FILTER_VALIDATE_BOOLEAN));
            }
        }

        // ⏰ Active flash deal special case
        if ($request->query('flash_deal') === 'active') {
            $now = now();
            $query->where('is_flash_deal', true)
                ->where('flash_deal_start', '<=', $now)
                ->where('flash_deal_end', '>=', $now);
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
    public function getActiveProducts(){
       return  Product::with(['sizes', 'variants'])
                    ->where('is_active', true)
                    ->orderBy('created_at', 'desc')
                    ->get();
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
                    ->orderBy('sold_count', 'desc')
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
