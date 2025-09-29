<?php

namespace App\Services;

use App\Repository\ProductRepository;
use App\Http\Resources\Product\ProductListResource;
use App\Http\Resources\Product\SingleProductResource;

class ProductService
{
    /**
     * Create a new class instance.
     */
    protected $productRepository;
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository= $productRepository;
    }

    // Get all products
    public function getProducts(){
       return   ProductListResource::collection($this->productRepository->getProducts());
    }

    // Get product by ID
    public function getProductById($id){
        $product = $this->productRepository->getProductById($id);
        if($product){
            return new SingleProductResource($product);
        }
        return null;
    }

    // Get product by slug
    public function getProductBySlug($slug){
        $product = $this->productRepository->getProductBySlug($slug);
        if($product){
            return new SingleProductResource($product);
        }
        return null;
    }

}
