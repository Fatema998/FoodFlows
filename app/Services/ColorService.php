<?php

namespace App\Services;

use App\Repository\ColorRepository;
use App\Http\Resources\Color\ColorListResource;

class ColorService
{
    /**
     * Create a new class instance.
     */

    protected $colorRepository;

    public function __construct(ColorRepository $colorRepository)
    {
        $this->colorRepository= $colorRepository;
    }

    public function getAllColors()
    {
        // Logic to retrieve all colors
        return $this->colorRepository->getAllColors();

    }

    public function getActiveColors()
    {
        // Logic to retrieve active colors
        return ColorListResource::collection($this->colorRepository->getActiveColors());

    }

    public function createColor($data)
    {
        // Logic to create a new color
    }

    public function updateColor($id, $data)
    {
        // Logic to update a color by ID
    }

}
