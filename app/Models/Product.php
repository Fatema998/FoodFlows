<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'title',
        'slug',
        'brand_id',
        'category_id',
        'subcategory_id',
        'product_type_id',

        // Pricing
        'purchase_price',
        'price',
        'discount',
        'sell_price',

        'product_code',
        'sell_count',

        // Stock
        'total_stock',
        'reserved_stock',

        // Descriptions
        'main_thumbnail',
        'short_description',
        'long_descriptions',
        'materials',

        // Flags
        'is_active',
        'is_trending',
        'is_limited',
        'is_todays_pick',
        'is_new_arrival',
        'is_featured',
        'is_flash_deal',

        // Flash Deal
        'flash_deal_start',
        'flash_deal_end',

        // SEO
        'meta_title',
        'meta_description',
        'meta_keywords',

        // Sizes
        'has_size',
        'size_guide_id',
    ];

    /**
     * Cast attributes to native types
     * This FIXES "numbers stored as strings" problem
     */
    protected $casts = [
        // Prices
        'purchase_price' => 'integer',
        'price' => 'integer',
        'discount' => 'integer',
        'sell_price' => 'integer',

        // Stock
        'total_stock' => 'integer',
        'reserved_stock' => 'integer',
        'sell_count' => 'integer',

        // Booleans
        'is_active' => 'boolean',
        'is_trending' => 'boolean',
        'is_limited' => 'boolean',
        'is_todays_pick' => 'boolean',
        'is_new_arrival' => 'boolean',
        'is_featured' => 'boolean',
        'is_flash_deal' => 'boolean',
        'has_size' => 'boolean',

        // Dates
        'flash_deal_start' => 'datetime',
        'flash_deal_end' => 'datetime',
    ];

    /* -------------------------
     | Relationships
     ------------------------- */

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
        return $this->hasMany(ProductVariant::class)
            ->with('color');    
    }

    /* -------------------------
     | Optional Helpers (Enable if needed)
     ------------------------- */

    // public function getAvailableStockAttribute()
    // {
    //     return $this->total_stock - $this->reserved_stock;
    // }

    // public function scopeActive($query)
    // {
    //     return $query->where('is_active', true);
    // }

    // public function scopeFlashDeal($query)
    // {
    //     return $query->where('is_flash_deal', true);
    // }
}
