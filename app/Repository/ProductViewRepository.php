<?php

namespace App\Repository;

use App\Models\ProductView;

class ProductViewRepository
{
    /**
     * Create a new class instance.
     */
     public function __construct()
    {
        //
    }

    // Add your repository methods here
    public function createOrUpdateProductView($productId)
    {
            $ip = request()->ip();       
            // Only store if not already viewed by this IP
            ProductView::updateOrCreate(
                ['product_id' => $productId, 'ip_address' => $ip],
                ['created_at' => now(), 'updated_at' => now()]
            );
    }
    
    public function getRecentlyViewedProducts($limit){
        $recentViews= ProductView::with('product')->latest()->take($limit)->get();
        return $recentViews->pluck('product');
    }
}
