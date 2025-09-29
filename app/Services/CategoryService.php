<?php

namespace App\Services;

use App\Repository\CategoryRepository;
use App\Http\Resources\Category\CategoryListResource;

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

}
