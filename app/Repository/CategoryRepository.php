<?php

namespace App\Repository;

use App\Models\Category;

class CategoryRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    
    public function getAllCategories($limit = null)
    {
        $query = Category::whereNull('parent_id')
            ->withCount('products') // Uses category_id for parents
            ->with(['children' => function ($query) {
                $query->withCount('subcategoryProducts as products_count') 
                    ->orderBy('position', 'asc');
            }])
            ->orderBy('position', 'asc');

        // ✅ Handle Pagination vs Get
        if (!empty($limit) && is_numeric($limit)) {
            return $query->paginate((int)$limit);
        }

        return $query->get();
    }

    public function getAllSubCategories(){
        return Category::withCount('products') 
            ->whereNotNull('parent_id')                  
            ->orderBy('position', 'asc')                 
            ->get();
    }

   public function getActiveCategoriesWithChildren()
    {
    return Category::where('is_active', true)
            ->whereNull('parent_id')
            ->withCount('products') // Parents: checks category_id
            ->with(['children' => function($query) {
                $query->where('is_active', true)
                    // Children: checks subcategory_id, aliased for the Resource
                    ->withCount('subcategoryProducts as products_count') 
                    ->orderBy('position', 'asc');
            }])
            // Note: 'having' only filters the Parent categories in this context
            ->having('products_count', '>', 0) 
            ->orderBy('position', 'asc')
            ->get();
    }

    public function getCategoryById($id)
    {
        return Category::findOrFail($id);
    }

    public function getCategoryBySlug($slug)
    {
        return Category::where('slug', $slug)->first();
    }

    // create category
    public function createCategory($data){
        return Category::create($data);
    }

    // ✅ Update category
    public function updateCategory($data, $id)
    {
        $category = $this->getCategoryById($id);
        $category->update($data);
        return $category;
    }

    // ✅ Delete category
    public function deleteCategory($id)
    {
        $category = $this->getCategoryById($id);
        $category->delete(); 
        return $category;
    }

}
