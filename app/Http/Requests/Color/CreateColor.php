<?php

namespace App\Http\Requests\Color;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateColor extends FormRequest
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
        'name' => ['required', 'string', 'max:255', Rule::unique('colors', 'name')],
        'code' => [
            'required',
            'regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            Rule::unique('colors', 'code'),
        ],
        'position' => ['nullable', 'integer', 'min:1'],
        'is_active' => ['nullable', 'boolean'],
    ];
    }

    /**
     * Custom error messages.
     */
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
