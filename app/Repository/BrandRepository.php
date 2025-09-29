<?php

namespace App\Repository;

use App\Models\Brand;

class BrandRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    // Get all brands
    public function getBrands($limit){
        
       return Brand::where('is_active', true)
                    ->orderBy('position')
                    ->limit($limit)
                    ->get();
    }
}
