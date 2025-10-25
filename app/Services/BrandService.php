<?php

namespace App\Services;

use App\Repository\BrandRepository;
use App\Http\Resources\Brand\BrandListResource;

class BrandService
{
    protected $brandRepository;

    public function __construct(BrandRepository $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function getAllBrands($limit = null)
    {
        return BrandListResource::collection($this->brandRepository->getAllBrands($limit));
    }
    public function getActiveBrands($limit = null)
    {
        return BrandListResource::collection($this->brandRepository->getActiveBrands($limit));
    }

    public function getBrandById($id)
    {
        return $this->brandRepository->getBrandById($id);
    }

    public function createBrand($data)
    {
        return $this->brandRepository->createBrand($data);
    }

    public function updateBrand($data, $id)
    {
        return $this->brandRepository->updateBrand($data, $id);
    }

    public function deleteBrand($id)
    {
        return $this->brandRepository->deleteBrand($id);
    }
}
