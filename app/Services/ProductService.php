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

    // admin works
    // Get product by ID
    public function getProductByIdAdmin($id){
        $product = $this->productRepository->getProductById($id);
        return $product;
    }

   public function createProduct(array $data)
    {
        // Ensure required fields exist
        $price = (float) $data['price'];
        $discount = (float) ($data['discount'] ?? 0);
        $purchasePrice = (float) ($data['purchase_price'] ?? 0);
        $totalStock = (int) ($data['total_stock'] ?? 0);
        $reservedStock = (int) ($data['reserved_stock'] ?? 0);

        // Calculate sell price
        $data['sell_price'] = round($price - ($price * $discount / 100), 2);

        // Assign stock and purchase price if provided
        $data['purchase_price'] = $purchasePrice;
        $data['total_stock'] = $totalStock;
        $data['reserved_stock'] = $reservedStock;

        // Create product via repository
        return $this->productRepository->createProduct($data);
    }

    public function updateProduct(array $data, int $id)
    {
        // Fetch existing product
        $product = $this->productRepository->getProductById($id);

        if (!$product) {
            throw new \Exception("Product not found with ID {$id}");
        }

        // Update price, discount, sell_price
        if (isset($data['price'])) {
            $price = (float) $data['price'];
            $discount = (float) ($data['discount'] ?? $product->discount);
            $data['sell_price'] = round($price - ($price * $discount / 100), 2);
        }

        // Update stock fields if provided
        if (isset($data['total_stock'])) {
            $data['total_stock'] = (int) $data['total_stock'];
        }
        if (isset($data['reserved_stock'])) {
            $data['reserved_stock'] = (int) $data['reserved_stock'];
        }
        if (isset($data['purchase_price'])) {
            $data['purchase_price'] = (float) $data['purchase_price'];
        }

        // Update via repository
        return $this->productRepository->updateProduct($data, $id);
    }

    // delete product
    public function deleteCategory($id){
        return $this->productRepository->deleteCategory($id);
    }
}
