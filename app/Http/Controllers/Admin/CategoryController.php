<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Services\FileUploadService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CreateCategory;
use App\Http\Requests\Category\UpdateCategory;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the categories.
     */
    public function index(Request $request)
    {
        try {
            // Get categories with pagination
            $limit = (int) $request->query('limit', 3);
            $categories = $this->categoryService->getAllCategories($limit);

            // Render Inertia page
            return Inertia::render('AdminDashboard/Category/Index', [
                'categories' => $categories,
            ]);
        } catch (Exception $e) {
            // Handle any errors gracefully
            return redirect()->back()->with('error', 'Failed to load categories: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        try {
            return Inertia::render('AdminDashboard/Category/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load create form: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a sub-category.
     */
    public function createsub()
    {
        try {
            $categories = $this->categoryService->getAllCategories();

            return Inertia::render('AdminDashboard/Category/CreateSub', [
                'categories' => $categories,
            ]);

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load sub-category form: ' . $e->getMessage());
        }
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(CreateCategory $request)
    {
        try {
            // Validate input data
            $data = $request->validated();

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $data['image'] = FileUploadService::upload($request->file('image'), 'categories');
            }

            // Create new category
            $this->categoryService->createCategory($data);

            return redirect()->route('admin.category.index')->with('success', 'Category created successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create category: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(string $id)
    {
        try {
            $category = $this->categoryService->getCategoryById($id);
            $categories = $this->categoryService->getAllCategories();

            return Inertia::render('AdminDashboard/Category/Edit', [
                'category' => $category,
                'categories' => $categories,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load category: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified category in storage.
     */
    public function update(UpdateCategory $request, string $id)
    {
        try {
            $data = $request->validated();
            $category = $this->categoryService->getCategoryById($id);

            // Replace image if uploaded
            if ($request->hasFile('image')) {
                FileUploadService::delete($category->image); // Delete old image
                $data['image'] = FileUploadService::upload($request->file('image'), 'categories');
            }

            // Update category
            $this->categoryService->updateCategory($data, $id);

            return redirect()->route('admin.category.index')->with('success', 'Category updated successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update category: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = $this->categoryService->getCategoryById($id);

            // Delete associated image if exists
            FileUploadService::delete($category->image);

            // Delete category from database
            $this->categoryService->deleteCategory($id);

            return redirect()->route('admin.category.index')->with('success', 'Category deleted successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete category: ' . $e->getMessage());
        }
    }
}
