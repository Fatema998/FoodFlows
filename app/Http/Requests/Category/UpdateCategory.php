<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategory extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow authorized users; can add policy later if needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
  public function rules(): array
    {
        // 1. Get the ID correctly from the route. 
        // If your route is /categories/{category}, use 'category'.
        $categoryId = $this->route('id') ?? $this->route('category'); 
        
        // 2. Get the parent_id from the request input
        $parentId = $this->input('parent_id');

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                // SCOPED UNIQUE RULE:
                // Allows same slug ONLY if parent_id is different
                Rule::unique('categories', 'slug')
                    ->where(function ($query) use ($parentId) {
                        return $query->where('parent_id', $parentId);
                    })
                    ->ignore($categoryId),
            ],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp'],
            'is_active' => ['nullable', 'boolean'],
            'position' => ['nullable', 'integer', 'min:0'],
            'parent_id' => [
                'nullable', 
                'exists:categories,id',
                // Prevent a category from being its own parent (causes infinite loops)
                Rule::notIn([$categoryId]),
            ],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'meta_keywords' => ['nullable', 'string'],
        ];
    }
    /**
     * Custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The category name is required.',
            'slug.required' => 'A slug is required for the category.',
            'slug.unique' => 'This slug is already in use.',
            'image.image' => 'Please upload a valid image file.',
            'image.mimes' => 'Allowed image formats: jpg, jpeg, png, webp.',
        ];
    }
}
