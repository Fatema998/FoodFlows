<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductType extends Model
{
    //
     use HasFactory;

    protected $fillable = ['name','gender','size_required','is_active'];

    public function sizes()
    {
        return $this->hasMany(Size::class);
    }
}
