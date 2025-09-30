<?php

namespace App\Repository;

use App\Models\Color;

class ColorRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAllColors()
    {
        // Logic to retrieve all colors from the database
        return Color::where('is_active', true)
            ->withCount('products')
            ->having('products_count', '>', 0)
            ->orderBy('position', 'asc')
            ->get();    
    }
}
