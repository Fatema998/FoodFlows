<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthLogin extends FormRequest
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
            'email' => 'required|email',
            'password' => 'required',
        ];
    }

    /**
     * Custom validation messages
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Please enter your email',
            'email.email' => 'Email must be a valid email address',
            'password.required' => 'Please enter your password',
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
