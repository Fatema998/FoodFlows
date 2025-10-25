<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ColorService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Color\CreateColor;
use App\Http\Requests\Color\UpdateColor;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class ColorController extends Controller
{
    protected $colorService;

    public function __construct(ColorService $colorService)
    {
        $this->colorService = $colorService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $colors = $this->colorService->getAllColors();

            return Inertia::render('AdminDashboard/Color/Index', [
                'colors' => $colors
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load colors: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('AdminDashboard/Color/Create');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load create form: ' . $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateColor $request)
    {
        try {
            $color = $this->colorService->createColor($request->validated());

            return redirect()
                ->route('admin.color.index')
                ->with('success', 'Color created successfully!');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create color: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $color = $this->colorService->getColorById($id);

            return Inertia::render('AdminDashboard/Color/Edit', [
                'color' => $color,
            ]);
        } catch (ModelNotFoundException $e) {
            return redirect()->route('admin.color.index')->with('error', 'Color not found.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to load color: ' . $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColor $request, string $id)
    {
        try {
            $color = $this->colorService->updateColor($request->validated(), $id);

            return redirect()
                ->route('admin.color.index')
                ->with('success', 'Color updated successfully!');

        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (ModelNotFoundException $e) {
            return redirect()->route('admin.color.index')->with('error', 'Color not found.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update color: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            
            $this->colorService->deleteColor($id);

            return redirect()
                ->back()
                ->with('success', 'Color deleted successfully!');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Color not found.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete color: ' . $e->getMessage());
        }
    }
}
