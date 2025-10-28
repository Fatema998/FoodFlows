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
            'main_thumbnail'=> $this->main_thumbnail,
            'product_code'=>$this->product_code,
            'price' => $this->price,
            'discount' => $this->discount,
            'sale_price' => $this->sale_price,
            'quantity' => $this->quantity,
            'is_trending' => $this->is_trending,
            'is_limited' => $this->is_limited,
            'is_active' => $this->is_active,
            'is_todays_pick' => $this->is_todays_pick,
            'is_new_arrival' => $this->is_new_arrival,
            'is_featured' => $this->is_featured,
            'is_flash_deal' => $this->is_flash_deal,
            'flash_deal_start' => $this->flash_deal_start,
            'flash_deal_end' => $this->flash_deal_end,
            'brand'=>$this->brand ? [
                'id' => $this->brand->id,
                'name' => $this->brand->name,
                'slug' => $this->brand->slug,
            ] : null,
            'category'=>$this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ] : null,
            'subcategory'=>$this->subcategory ? [
                'id' => $this->subcategory->id,
                'name' => $this->subcategory->name,
                'slug' => $this->subcategory->slug,
            ] : null,
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
