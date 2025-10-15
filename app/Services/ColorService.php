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

    // use  api
    public function getActiveColors()
    {
        // Logic to retrieve active colors
        return ColorListResource::collection($this->colorRepository->getActiveColors());

    }

    public function getColorById($id){
        return $this->colorRepository->getColorById($id);
    }

    public function createColor($data)
    {
        // Logic to create a new color
        return $this->colorRepository->createColor($data);
    }

    public function updateColor($data, $id)
    {
        // Logic to update a color by ID

         return $this->colorRepository->updateColor($data,$id);
    }

    public function deleteColor($id){
        return $this->colorRepository->deleteColor($id);

    }
}
