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

    /** Display all brands */
    public function index(Request $request)
    {
        try {
            $limit = (int) $request->query('limit', 10);
            $brands = $this->brandService->getAllBrands($limit);

            return Inertia::render('AdminDashboard/Brand/Index', [
                'brands' => $brands,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load brands: ' . $e->getMessage());
        }
    }

    /** Show create brand form */
    public function create()
    {
        return Inertia::render('AdminDashboard/Brand/Create');
    }

    /** Store new brand */
    public function store(CreateBrand $request)
    {
        $data = $request->validated();

        // Upload image if exists
        if ($request->hasFile('image')) {
            $data['image'] = FileUploadService::upload($request->file('image'), 'brands');
        }

        $this->brandService->createBrand($data);

        return redirect()->route('admin.brand.index')->with('success', 'Brand created successfully.');
    }

    /** Show edit form */
    public function edit($id)
    {
        $brand = $this->brandService->getBrandById($id);

        return Inertia::render('AdminDashboard/Brand/Edit', [
            'brand' => $brand
        ]);
    }

    /** Update brand */
    public function update(UpdateBrand $request, $id)
    {
        $data = $request->validated();
        $brand = $this->brandService->getBrandById($id);

        // Replace image if uploaded
        if ($request->hasFile('image')) {
            FileUploadService::delete($brand->image); // delete old image
            $data['image'] = FileUploadService::upload($request->file('image'), 'brands');
        }

        $this->brandService->updateBrand($data, $id);

        return redirect()->route('admin.brand.index')->with('success', 'Brand updated successfully.');
    }

    /** Delete brand */
    public function destroy($id)
    {
        $brand = $this->brandService->getBrandById($id);

        // Delete image from storage
        FileUploadService::delete($brand->image);

        $this->brandService->deleteBrand($id);

        return redirect()->route('admin.brand.index')->with('success', 'Brand deleted successfully.');
    }
}
