<?php

namespace App\Http\Requests\Color;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateColor extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id'); // ✅ Get the ID from route parameter

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('colors', 'name')->ignore($id),
            ],
            'code' => [
                'required',
                'regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
                Rule::unique('colors', 'code')->ignore($id),
            ],
            'position' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter a color name.',
            'name.unique' => 'This color name already exists.',
            'code.required' => 'Please provide a color code.',
            'code.regex' => 'The color code must be a valid hex format (e.g., #FF0000 or #abc).',
            'code.unique' => 'This color code already exists.',
        ];
    }
}
