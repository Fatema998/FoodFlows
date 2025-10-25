<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Slider extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'button_text',
        'link',
        'position',
        'is_active',
        'layout',
    ];
    
}
