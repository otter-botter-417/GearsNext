<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'itemId' => 'required|integer',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'itemId.required' => 'アイテムIDは必須です。',
            'itemId.integer'  => 'アイテムIDは整数である必要があります。',
        ];
    }
}
