<?php

namespace App\Http\Requests\Brand;

use Illuminate\Foundation\Http\FormRequest;

class CreateBrand extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:brands,name'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:brands,slug'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp'],
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
