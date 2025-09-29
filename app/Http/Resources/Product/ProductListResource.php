<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
             return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'price' => $this->price,
            'discount' => $this->discount,
            'sold_price' => $this->sold_price,
            
            'quantity' => $this->quantity,
            'is_trending' => $this->is_trending,
            'is_limited' => $this->is_limited,
            'is_active' => $this->is_active,
            'is_featured' => $this->is_featured,
            'is_flash_deal' => $this->is_flash_deal,
            'flash_deal_start' => $this->flash_deal_start,
            'flash_deal_end' => $this->flash_deal_end,
           
            'sizes' => $this->sizes->map(function ($size) {
                return [
                    'id' => $size->id,
                    'name' => $size->name,
                ];
            }),
            'variants' => $this->variants->map(function ($variant) {
                return [
                    'id' => $variant->id,
                    'color' => [
                        'id' => $variant->color->id,
                        'name' => $variant->color->name,
                        'code' => $variant->color->code,
                    ],
                    'image' => $variant->image,
                ];
            }),
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
