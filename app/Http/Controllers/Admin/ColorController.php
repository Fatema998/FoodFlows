<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ColorService;
use App\Http\Controllers\Controller;

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
        //
        try {
            $colors = $this->colorService->getAllColors();

            return Inertia::render('AdminDashboard/Color/Index', [
                'colors' => $colors,
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
