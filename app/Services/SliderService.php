<?php

namespace App\Services;

use App\Repository\SliderRepository;
use App\Http\Resources\Slider\SliderListResource;

class SliderService
{
    /**
     * Create a new class instance.
     */
    protected $sliderRepository;

    public function __construct(SliderRepository $sliderRepository)
    {
        $this->sliderRepository=$sliderRepository;
    }

    // Get all sliders
    public function getSliders($limit){
       return  SliderListResource::collection($this->sliderRepository->getSliders($limit));
    }  
}
