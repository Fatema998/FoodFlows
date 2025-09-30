<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Size extends Model
{
    //
     use HasFactory;

    protected $fillable = [
        'product_type_id','type','name','numeric',
        'chest_min','chest_max','waist_min','waist_max',
        'hip_min','hip_max','bust_min','bust_max',
        'position','is_active'
    ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
    
    protected $hidden = ['pivot']; // hide pivot field
}
