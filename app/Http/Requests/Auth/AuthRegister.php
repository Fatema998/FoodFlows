<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthRegister extends FormRequest
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
     */
     public function rules(): array
    {
        return [
            'name' => 'required|min:5|max:150',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:5|max:25|confirmed', // added confirmed
        ];
    }

    /**
     * Custom validation messages
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name',
            'name.min' => 'Name must be at least 5 characters long',
            'name.max' => 'Name must not be more than 150 characters',

            'email.required' => 'Please enter your email',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email is already taken. Please try with another email address',

            'password.required' => 'Please enter your password',
            'password.min' => 'Password must be at least 5 characters long',
            'password.max' => 'Password must not be more than 25 characters',
            'password.confirmed' => 'Password confirmation does not match', // added message
        ];
    }

    /**
     * Custom failed validation response
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        // Convert arrays to single string messages
        $formattedErrors = [];
        foreach ($errors as $field => $messages) {
            $formattedErrors[$field] = $messages[0];
        }

        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => $formattedErrors
                    ? $formattedErrors[array_key_first($formattedErrors)] .
                        (count($formattedErrors) > 1 ? " (and " . (count($formattedErrors) - 1) . " more errors)" : "")
                    : 'Validation failed',
                'errors' => $formattedErrors,
            ], 422)
        );
    }
}
