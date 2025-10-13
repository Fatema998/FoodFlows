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

    // Get  all brands 
    public function getAllBrands($limit = null)
    {
        $query = Brand::orderBy('position', 'asc');

        // ✅ If limit exists and is numeric → paginate
        if (!empty($limit) && is_numeric($limit)) {
            return $query->paginate($limit);
        }

        // ✅ Otherwise → return all results
        return $query->get();
    }

    
    // Get active brands
    public function getActiveBrands($limit){
        
       return Brand::where('is_active', true)
                    ->orderBy('position')
                    ->limit($limit)
                    ->get();
    }
}
