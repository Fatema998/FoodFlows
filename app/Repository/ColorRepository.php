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
        return Color::withCount('products')
            ->orderBy('position', 'asc')
            ->get();    
    }

    public function getActiveColors()
    {
        // Logic to retrieve all colors from the database
        return Color::where('is_active', true)
            ->withCount('products')
            ->having('products_count', '>', 0)
            ->orderBy('position', 'asc')
            ->get();    
    }
    

    //  get color By id
    public function getColorById($id)
    {
       return Color::findOrFail($id);
    }

    // create color
    public function createColor($data){
        return Color::create($data);
    }

    // ✅ Update color
    public function updateColor($data, $id)
    {

        $color = $this->getColorById($id);
        $color->update($data);
        return $color;
    }

    // ✅ Delete color
    public function deleteColor($id)
    {
        $color = $this->getColorById($id);
        $color->delete(); 
        return $color;
    }


}
