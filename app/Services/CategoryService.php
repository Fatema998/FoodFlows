<?php

namespace App\Services;

use App\Repository\CategoryRepository;
use App\Http\Resources\Category\CategoryListResource;
use App\Http\Resources\Category\SingleCategoryResource;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository= $categoryRepository;
    }
    
    // Get all brands
    public function getCategories(){
       return CategoryListResource::collection($this->categoryRepository->getCategoriesWithChildren());
    }

    // Get category by ID 
    public function getCategoryProductsById($id){
        $category = $this->categoryRepository->getCategoryById($id);
        if($category){
          $category->load(['products' => function($query) {
             $query->where('is_active', true)->orderBy('created_at', 'desc');
          }]);
         return  new SingleCategoryResource($category);
       }
         return null;
    }

    // category details with products by slug
    public function getCategoryProductsBySlug($slug){
       $category = $this->categoryRepository->getCategoryBySlug($slug);
       if($category){
          $category->load(['products' => function($query) {
             $query->where('is_active', true)->orderBy('created_at', 'desc');
          }]);
                 return  new SingleCategoryResource($category);

       }
       return null;
    }

}
