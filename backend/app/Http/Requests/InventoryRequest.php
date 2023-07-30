<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
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
        return [
            'data.userId' => 'required|string',
            'data.itemId' => 'required|integer',
        ];
    }
    public function messages()
    {
        return [
            'data.userId.required' => 'ユーザーIDは必須です。',
            'data.itemId.required' => 'アイテムIDは必須です。',
            'data.userId.string'  => 'ユーザーIDは文字列である必要があります。',
            'data.itemId.integer'  => 'アイテムIDは整数である必要があります。',
        ];
    }
}
