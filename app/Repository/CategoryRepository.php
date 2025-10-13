<?php

namespace App\Repository;

use App\Models\Category;

class CategoryRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    
    public function getAllCategories($limit = null)
    {
        $query = Category::withCount('products')
            ->whereNull('parent_id')
            ->with(['children' => function ($query) {
                $query->withCount('products')
                    ->orderBy('position', 'asc');
            }])
            ->orderBy('position', 'asc');

        // ✅ If limit exists and is numeric, use pagination
        if (!empty($limit) && is_numeric($limit)) {
            return $query->paginate($limit);
        }

        // ✅ Otherwise, return all results without pagination
        return $query->get();
    }



    public function getAllSubCategories(){
        return Category::withCount('products') 
            ->whereNotNull('parent_id')                  
            ->orderBy('position', 'asc')                 
            ->get();
    }

   public function getActiveCategoriesWithChildren()
    {
        return Category::where('is_active', true)
            ->withCount('products')
            ->with(['children' => function($query) {
                $query->where('is_active', true)->withCount('products');
            }])
            ->having('products_count', '>', 0)
            ->orderBy('position', 'asc')
            ->get();
    }

    public function getCategoryById($id)
    {
        return Category::where('id', $id)
              ->where('is_active', true)
              ->first();
    }

    public function getCategoryBySlug($slug)
    {
        return Category::where('slug', $slug)->where('is_active', true)->first();
    }

}
