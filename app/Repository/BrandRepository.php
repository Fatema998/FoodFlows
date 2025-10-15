<?php

namespace App\Repository;

use App\Models\Brand;

class BrandRepository
{
    public function getAllBrands($limit = null)
    {
        $query = Brand::orderBy('position', 'asc');

        return $limit ? $query->paginate($limit) : $query->get();
    }
    // Get active brands
     public function getActiveBrands($limit){ 
        return Brand::where('is_active', true) ->orderBy('position') ->limit($limit) ->get();
     }

    public function getBrandById($id)
    {
        return Brand::findOrFail($id);
    }

    public function createBrand($data)
    {
        return Brand::create($data);
    }

    public function updateBrand($data, $id)
    {
        $brand = $this->getBrandById($id);
        $brand->update($data);
        return $brand;
    }

    public function deleteBrand($id)
    {
        $brand = $this->getBrandById($id);
        $brand->delete();
        return $brand;
    }
}
