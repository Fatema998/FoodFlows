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

    // get all sliders
       public function getAllSliders(){
       return  $this->sliderRepository->getAllSliders();
    }  

    // Get active sliders
    public function getActiveSliders($limit){
       return  SliderListResource::collection($this->sliderRepository->getActiveSliders($limit));
    }  
}
