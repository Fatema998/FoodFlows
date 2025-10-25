<?php

namespace App\Models;

use App\Models\SizeGuide;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SizeGuideMeasurement extends Model
{
    //
      use HasFactory;

       protected $fillable = [
        'size_guide_id',
        'size_label',
        'chest',
        'waist',
        'hip',
        'body_length',
        'sleeve_length',
        'shoulder',
        'inseam',
        'thigh',
        'crotch_depth',
        'foot_length',
        'underbust',
        'cup_size',
    ];

    public function sizeGuide()
    {
        return $this->belongsTo(SizeGuide::class);
    }
}
