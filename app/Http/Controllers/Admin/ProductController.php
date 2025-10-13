<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\BrandService;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    protected $productService;
    protected $brandService;
    protected $categoryService;
    
    public function __construct(ProductService $productService,BrandService $brandService,CategoryService $categoryService)
    {
        $this->productService = $productService;
        $this->brandService = $brandService;
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request )
    {
        //
        try {

            $limit = (int) $request->query('limit', 10);
            $products = $this->productService->getAllProducts($request,$limit);
            $brands = $this->brandService->getAllBrands();
            $categories = $this->categoryService->getAllCategories();

            return Inertia::render('AdminDashboard/Product/Index', [
                'products' => $products,
                'brands'=>$brands,
                'categories'=>$categories,
                'filters' => $request->only([
                    'search',
                    'start_date',
                    'end_date',
                    'category',
                    'subcategory',
                    'brand',
                    'active',
                    'trending',
                    'limited',
                    'todays_pick',
                    'new_arrival',
                    'featured',
                    'flash_deal',
                    'limit'
            ]),
        ]);

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load brands: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
