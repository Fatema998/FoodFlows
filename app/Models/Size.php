<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Size extends Model
{
    //
     use HasFactory;

    protected $fillable = [];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
    
    protected $hidden = ['pivot']; // hide pivot field
}
