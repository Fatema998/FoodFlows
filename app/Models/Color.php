<?php

namespace App\Models;

use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Color extends Model
{
    use HasFactory;
     protected $fillable = ['name', 'code', 'is_active','position'];

     public function products()
        {
            return $this->hasMany(ProductVariant::class);
        }

}


