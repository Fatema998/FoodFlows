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
    
    // Get all brands
    public function getBrands($limit){
       return  BrandListResource::collection($this->brandRepository->getBrands($limit));
    }

}
