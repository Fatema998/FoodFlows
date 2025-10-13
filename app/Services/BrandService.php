<?php

namespace App\Services;

use App\Repository\BrandRepository;
use App\Http\Resources\Brand\BrandListResource;

class BrandService
{
    /**
     * Create a new class instance.
     */
    protected $brandRepository;
    public function __construct(BrandRepository $brandRepository)
    {
        $this->brandRepository= $brandRepository;
    }

    public function getAllBrands($limit=null){
         return  BrandListResource::collection($this->brandRepository->getAllBrands($limit));
    }
    
    // Get active brands
    public function getActiveBrands($limit){
       return  BrandListResource::collection($this->brandRepository->getActiveBrands($limit));
    }

}
