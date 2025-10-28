<?php

namespace App\Http\Requests\Product;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateProduct extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
     public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'slug'),
            ],
            'brand_id' => ['required', Rule::exists('brands', 'id')],
            'category_id' => ['required', Rule::exists('categories', 'id')],
            'subcategory_id' => ['nullable'],
            'product_type_id' => ['nullable', Rule::exists('product_types', 'id')],

            'price' => ['required', 'numeric', 'min:0'],
            'discount' => ['nullable', 'integer', 'min:0', 'max:100'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],

            'product_code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'product_code'),
            ],
            'quantity' => ['required', 'integer', 'min:0'],

            'main_thumbnail' => ['required', 'image', 'mimes:jpg,jpeg,png,webp'],

            'short_description' => ['nullable', 'string'],
            'long_descriptions' => ['nullable', 'string'],
            'materials' => ['nullable', 'string'],

            'is_active' => ['boolean'],
            'is_trending' => ['boolean'],
            'is_limited' => ['boolean'],
            'is_todays_pick' => ['boolean'],
            'is_new_arrival' => ['boolean'],
            'is_featured' => ['boolean'],
            'is_flash_deal' => ['boolean'],

            'flash_deal_start' => ['nullable', 'date'],
            'flash_deal_end' => ['nullable', 'date', 'after:flash_deal_start'],

            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'meta_keywords' => ['nullable', 'string'],

            'has_size' => ['boolean'],
            'size_guide_id' => ['nullable', Rule::exists('size_guides', 'id')],
            'sizes' => ['nullable', 'array'],
            'sizes.*' => [Rule::exists('sizes', 'id')],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a product title.',
            'slug.required' => 'The product slug is required.',
            'slug.unique' => 'This slug is already in use.',
            'brand_id.required' => 'Please select a brand.',
            'brand_id.exists' => 'The selected brand is invalid.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category is invalid.',
            'subcategory_id.exists' => 'The selected subcategory is invalid.',
            'product_type_id.exists' => 'The selected product type is invalid.',

            'price.required' => 'Please enter the product price.',
            'price.numeric' => 'Price must be a valid number.',
            'discount.integer' => 'Discount must be a valid integer.',
            'discount.max' => 'Discount cannot be more than 100%.',
            'sale_price.numeric' => 'Sold price must be a valid number.',

            'product_code.required' => 'Product code is required.',
            'product_code.unique' => 'This product code is already used.',
            'quantity.required' => 'Please specify the available quantity.',
            'quantity.integer' => 'Quantity must be a whole number.',

            'main_thumbnail.required' => 'Main product image is required.',
            'main_thumbnail.image' => 'The thumbnail must be an image file.',

            'flash_deal_end.after' => 'Flash deal end date must be after the start date.',

            'size_guide_id.exists' => 'The selected size guide is invalid.',
            'sizes.*.exists' => 'One or more selected sizes are invalid.',

            'meta_title.max' => 'Meta title must not exceed 255 characters.',
        ];
    }
}
