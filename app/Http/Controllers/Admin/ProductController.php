<?php

namespace App\Http\Controllers\Admin;

use Exception;
use App\Models\Size;
use Inertia\Inertia;
use App\Models\ProductType;
use Illuminate\Http\Request;
use App\Services\BrandService;
use App\Services\ColorService;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Services\FileUploadService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\UpdateProduct;

class ProductController extends Controller
{
    protected $productService;
    protected $brandService;
    protected $categoryService;
    protected $colorService;

    
    public function __construct(ProductService $productService,BrandService $brandService,CategoryService $categoryService,ColorService $colorService)
    {
        $this->productService = $productService;
        $this->brandService = $brandService;
        $this->categoryService = $categoryService;
        $this->colorService = $colorService;

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
        $brands = $this->brandService->getAllBrands();
        $categories = $this->categoryService->getAllCategories();
        $colors = $this->colorService->getAllColors();

         return Inertia::render('AdminDashboard/Product/Create',[
            'brands'=>$brands,
            'categories'=>$categories,
            'colors'=>$colors,
            'productTypes'=>ProductType::all(),
            'sizes'=>Size::all()
         ]);
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
        $product = $this->productService->getProductByIdAdmin($id);
        $brands = $this->brandService->getAllBrands();
        $categories = $this->categoryService->getAllCategories();
        $colors = $this->colorService->getAllColors();

         return Inertia::render('AdminDashboard/Product/Edit',[
            'product'=>$product,
            'brands'=>$brands,
            'categories'=>$categories,
            'colors'=>$colors,
            'productTypes'=>ProductType::all(),
            'sizes'=>Size::all()
         ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProduct $request, string $id)
    {
        try {
            $data = $request->validated();
            $product = $this->productService->getProductByIdAdmin($id);

            // Replace image if uploaded
            if ($request->hasFile('main_thumbnail')) {
                FileUploadService::delete($product->main_thumbnail); // Delete old image
                $data['main_thumbnail'] = FileUploadService::upload($request->file('main_thumbnail'), 'products/thumbnail');
            }

            // Update category
            $this->productService->updateProduct($data, $id);

            return redirect()->route('admin.product.index')->with('success', 'Product updated successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update category: ' . $e->getMessage());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
