<?php

namespace App\Models;

use App\Models\Size;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'brand_id',
        'category_id',
        'subcategory_id',
        'price',
        'discount',
        'sold_price',
        'product_code',
        'sell_count',
        'quantity',
        'main_thumbnail',
        'short_description',
        'long_descriptions',
        'materials',
        'is_trending',
        'is_limited',
        'is_active',
        'is_featured',
        'is_flash_deal',
        'flash_deal_start',
        'flash_deal_end',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];
    
   // Relationships
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subcategory()
    {
        return $this->belongsTo(Category::class, 'subcategory_id');
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_sizes')
                    ->withTimestamps();
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class)->with('color');    
    }
    
}
