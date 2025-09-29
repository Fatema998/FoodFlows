<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    //
        use HasFactory;
        protected $fillable = ['name', 'slug', 'description', 'image'];

            
        // One-to-many: Category has many products
        public function products()
        {
            return $this->hasMany(Product::class);
        }

        // Children categories
        public function children()
        {
            return $this->hasMany(Category::class, 'parent_id')->with('children');
        }

        // Parent category
        public function parent()
        {
            return $this->belongsTo(Category::class, 'parent_id');
        }


}
