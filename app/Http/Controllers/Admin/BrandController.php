<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\BrandService;
use App\Services\FileUploadService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\CreateBrand;
use App\Http\Requests\Brand\UpdateBrand;

class BrandController extends Controller
{
    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    /**
     * Display a listing of all brands.
     */
    public function index(Request $request)
    {
        try {
            // Get paginated brand list
            $limit = (int) $request->query('limit', 10);
            $brands = $this->brandService->getAllBrands($limit);

            // Render brand index page
            return Inertia::render('AdminDashboard/Brand/Index', [
                'brands' => $brands,
            ]);
        } catch (Exception $e) {
            // Handle any exception gracefully
            return redirect()->back()->with('error', 'Failed to load brands: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new brand.
     */
    public function create()
    {
        try {
            return Inertia::render('AdminDashboard/Brand/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load create form: ' . $e->getMessage());
        }
    }

    /**
     * Store a newly created brand in storage.
     */
    public function store(CreateBrand $request)
    {
        try {
            // Validate request data
            $data = $request->validated();

            // Upload image if available
            if ($request->hasFile('image')) {
                $data['image'] = FileUploadService::upload($request->file('image'), 'brands');
            }

            // Create brand via service
            $this->brandService->createBrand($data);

            return redirect()->route('admin.brand.index')->with('success', 'Brand created successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create brand: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing a brand.
     */
    public function edit($id)
    {
        try {
            // Retrieve the brand record
            $brand = $this->brandService->getBrandById($id);

            // Render edit view
            return Inertia::render('AdminDashboard/Brand/Edit', [
                'brand' => $brand,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load brand: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified brand in storage.
     */
    public function update(UpdateBrand $request, $id)
    {
        try {
            // Validate input data
            $data = $request->validated();
            $brand = $this->brandService->getBrandById($id);

            // Replace old image if a new one is uploaded
            if ($request->hasFile('image')) {
                FileUploadService::delete($brand->image); // Delete old image
                $data['image'] = FileUploadService::upload($request->file('image'), 'brands');
            }

            // Update brand record
            $this->brandService->updateBrand($data, $id);

            return redirect()->route('admin.brand.index')->with('success', 'Brand updated successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update brand: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified brand from storage.
     */
    public function destroy($id)
    {
        try {
            // Retrieve the brand to delete
            $brand = $this->brandService->getBrandById($id);

            // Delete associated image if it exists
            FileUploadService::delete($brand->image);

            // Delete brand record from database
            $this->brandService->deleteBrand($id);

            return redirect()->route('admin.brand.index')->with('success', 'Brand deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete brand: ' . $e->getMessage());
        }
    }
}
