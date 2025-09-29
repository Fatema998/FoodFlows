<?php

namespace App\Repository;

use App\Models\Slider;

class SliderRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    // Get all active sliders with optional limit
    public function getSliders($limit)
    {
        return Slider::where('is_active', true)
                    ->orderBy('position')
                    ->limit($limit)
                    ->get();
    }

}

