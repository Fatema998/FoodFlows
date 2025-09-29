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

   public function getCategoriesWithChildren()
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

}
