<?php

namespace App\Models;

use App\Models\SizeGuideMeasurement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SizeGuide extends Model
{
    //
      use HasFactory;
      
      protected $fillable = [
        'sub_category_id',
        'product_type',
        'gender',
        'title',
        'description',
        'image',
    ];

    public function measurements()
    {
        return $this->hasMany(SizeGuideMeasurement::class);
    }
}
