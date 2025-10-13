<?php

namespace App\Services;

use Exception;
use App\Repository\ProductRepository;
use Illuminate\Http\Request;
use App\Repository\ProductViewRepository;
use App\Http\Resources\Product\ProductListResource;
use App\Http\Resources\Product\SingleProductResource;

class ProductService
{
    /**
     * Create a new class instance.
     */
    protected $productRepository;
    protected $productViewRepository;

    public function __construct(ProductRepository $productRepository, ProductViewRepository $productViewRepository)
    {
        $this->productRepository= $productRepository;
        $this->productViewRepository= $productViewRepository;
    }

    // get all products
    public function getAllProducts(Request $request,$limit){
         $products = $this->productRepository->getAllProducts($request, $limit);
        return ProductListResource::collection($products);
    }

    // Get all active products
    public function getActiveProducts(){
       return   ProductListResource::collection($this->productRepository->getActiveProducts());
    }

    // Get product by ID
    public function getProductById($id){
        $product = $this->productRepository->getProductById($id);
        if($product){

            // Log recent view
            $this->productViewRepository->createOrUpdateProductView($product->id);

            //  return product details
            return new SingleProductResource($product);
        }
        return null;
    }

    // Get product by slug
    public function getProductBySlug($slug){
        $product = $this->productRepository->getProductBySlug($slug);
        if($product){
            // Log recent view
            $this->productViewRepository->createOrUpdateProductView($product->id);
            //  return product details
            return new SingleProductResource($product);
        }
        return null;
    }

    // best selling products
    public function bestSellingProducts($limit){
        return ProductListResource::collection($this->productRepository->bestSellingProducts($limit));
    }

    // All types in one call
    public function getWiseProducts($limit = 10)
    {
        $types = [
            'trending'     => 'is_trending',
            'todays_pick'  => 'is_todays_pick',
            'new_arrival'  => 'is_new_arrival',
            'featured'     => 'is_featured',
            'flash_deal'   => 'is_flash_deal',
        ];

        $result = [];
        foreach ($types as $key => $column) {
            $products = $this->productRepository->getTypeWiseProducts($column, $limit);

            $result[$key] = ProductListResource::collection($products);
        }

        return $result;
    }

    // Single type filter
    public function getProductsByType($type, $limit = 10)
    {
        $columns = [
            'trending'     => 'is_trending',
            'todays_pick'  => 'is_todays_pick',
            'new_arrival'  => 'is_new_arrival',
            'featured'     => 'is_featured',
            'flash_deal'   => 'is_flash_deal',
        ];

        if (!isset($columns[$type])) {
            throw new Exception("Invalid product type: $type");
        }

        $products = $this->productRepository->getTypeWiseProducts($columns[$type], $limit);

        return ProductListResource::collection($products);
    }

    // Recently viewed products
    public function getRecentlyViewedProducts($limit){
        return ProductListResource::collection($this->productViewRepository->getRecentlyViewedProducts($limit));
    } 

}
