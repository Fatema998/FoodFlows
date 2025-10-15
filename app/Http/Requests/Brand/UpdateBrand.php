<?php

namespace App\Http\Requests\Brand;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBrand extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // allow access; handle permission via middleware/policies
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $brandId = $this->route('id'); // get brand ID from route model binding

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('brands', 'name')->ignore($brandId),
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('brands', 'slug')->ignore($brandId),
            ],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'], // max 10MB
            'is_active' => ['sometimes', 'boolean'],
            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * Custom error messages for better clarity.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Brand name is required.',
            'name.unique' => 'This brand name already exists.',
            'slug.unique' => 'The slug must be unique.',
            'image.image' => 'Please upload a valid image file.',
            'image.mimes' => 'Image must be a file of type: jpeg, png, jpg, or webp.',
        ];
    }
}
