<?php

namespace App\Http\Controllers\Admin;

use Exception;
use App\Models\Size;
use Inertia\Inertia;
use App\Models\SizeGuide;
use App\Models\ProductType;
use Illuminate\Http\Request;
use App\Models\ProductVariant;
use App\Services\BrandService;
use App\Services\ColorService;
use App\Services\ProductService;
use App\Services\CategoryService;
use Illuminate\Http\UploadedFile;
use App\Services\FileUploadService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\CreateProduct;
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
            'sizes'=>Size::all(),
            'sizeGuides'=>SizeGuide::with('measurements')->get()
         ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateProduct $request)
    {
        //
        try {
            $data = $request->validated();
            // Replace image if uploaded
            if ($request->hasFile('main_thumbnail')) {
                $data['main_thumbnail'] = FileUploadService::upload($request->file('main_thumbnail'), 'products/thumbnail');
            }
        

            // create  product
          $product = $this->productService->createProduct($data);

        // ✅ Store Sizes (many-to-many)
        if ($request->has('sizes') && is_array($request->sizes)) {
            $product->sizes()->sync($request->sizes);
        }

         // ✅ Store Variants (color + image)
        if ($request->has('variants') && is_array($request->variants)) {
            foreach ($request->variants as $variantData) {
                $variant = [
                    'color_id' => $variantData['color_id'] ?? null,
                ];

                // If variant image uploaded
                if (isset($variantData['image']) && $variantData['image'] instanceof UploadedFile) {
                    $variant['image'] = FileUploadService::upload(
                        $variantData['image'],
                        'products/variants'
                    );
                }

                $product->variants()->create($variant);
            }
        }

            return redirect()->route('admin.product.index')->with('success', 'Product Created successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to Create Category: ' . $e->getMessage());
        }
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
            'sizes'=>Size::all(),
            'sizeGuides'=>SizeGuide::with('measurements')->get()
         ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateProduct $request, string $id)
    {
        try {

            // dd($request->all());

            $data = $request->validated();
            // dd($request->variants);
            $product = $this->productService->getProductByIdAdmin($id);

            // ✅ Handle main thumbnail update
            if ($request->hasFile('main_thumbnail')) {
                FileUploadService::delete($product->main_thumbnail); // delete old
                $data['main_thumbnail'] = FileUploadService::upload(
                    $request->file('main_thumbnail'),
                    'products/thumbnail'
                );
            }

            // ✅ Update product info
            $this->productService->updateProduct($data, $id);

            // ✅ Update Sizes (many-to-many)
            if ($request->has('sizes') && is_array($request->sizes)) {
                $product->sizes()->sync($request->sizes);
            }

            // ✅ Update Variants (color + image)
            if ($request->has('variants') && is_array($request->variants)) {
                    $requestIds = collect($request->variants)->pluck('id')->filter()->toArray();

                    foreach ($request->variants as $variantData) {

                        // Existing variant → update
                        if (!empty($variantData['id'])) {
                            $variant = $product->variants()->find($variantData['id']);
                            if ($variant) {
                                // Update color_id
                                $variant->color_id = $variantData['color_id'] ?? $variant->color_id;

                                // Handle image
                                if (isset($variantData['image'])) {
                                    // If it's a new uploaded file → replace
                                    if ($variantData['image'] instanceof UploadedFile) {
                                        if (!empty($variant->image)) {
                                            FileUploadService::delete($variant->image);
                                        }
                                        $variant->image = FileUploadService::upload(
                                            $variantData['image'],
                                            'products/variants'
                                        );
                                    } 
                                    // If it's a string → keep existing path
                                    elseif (is_string($variantData['image'])) {
                                        $variant->image = $variantData['image'];
                                    }
                                }

                                $variant->save();
                            }
                        } 
                        // New variant → create
                        else {

                        $productVariant = new ProductVariant();
                            $productVariant->product_id = $product->id;
                            $productVariant->color_id = $variantData['color_id'] ?? null;

                            if (isset($variantData['image']) && $variantData['image'] instanceof UploadedFile) {
                                $productVariant->image = FileUploadService::upload(
                                    $variantData['image'],
                                    'products/variants'
                                );
                            }

                            // Remove dd(), save only once
                            $productVariant->save();


                                // Add the new variant ID to $requestIds so it won't be deleted
                        //   $requestIds[] = "{$productVariant->id}";
                        $requestIds[] = strval($productVariant->id);

                        }
                    }
                    // dd($requestIds);
                    $product->variants()
                        ->whereNotIn('id', $requestIds)
                        ->get()
                        ->each(function ($oldVariant) {
                            if (!empty($oldVariant->image)) {
                                FileUploadService::delete($oldVariant->image);
                            }
                            $oldVariant->delete();
                        });
                }else {
                    // ❌ No variants in request → delete all existing variants
                    $product->variants()->get()->each(function ($variant) {
                        if (!empty($variant->image)) {
                            FileUploadService::delete($variant->image);
                        }
                        $variant->delete();
                    });
                }

            return redirect()->route('admin.product.index')->with('success', 'Product updated successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Get product
            $product = $this->productService->getProductByIdAdmin($id);

            if (!$product) {
                return redirect()->back()->with('error', 'Product not found.');
            }

            // Delete main thumbnail
            if (!empty($product->main_thumbnail)) {
                FileUploadService::delete($product->main_thumbnail);
            }

            // Delete variants and their images
            foreach ($product->variants as $variant) {
                if (!empty($variant->image)) {
                    FileUploadService::delete($variant->image);
                }
                $variant->delete();
            }

            // Optional: detach sizes (many-to-many)
            $product->sizes()->detach();

            // Delete the product
            $product->delete();

            return redirect()->route('admin.product.index')
                ->with('success', 'Product deleted successfully.');

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }

}
