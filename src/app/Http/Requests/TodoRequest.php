<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'title' => 'required|string|max:50',
            'description' => 'nullable|string|max:256',
            'is_completed' => 'nullable|boolean',
        ];

        if ($this->getMethod() === 'POST') {
            $rules['username'] = 'required|string';
        }

        return $rules;
    }
}
