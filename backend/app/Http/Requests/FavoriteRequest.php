<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FavoriteRequest extends FormRequest
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
            'data.userId' => 'required|string',
            'data.itemId' => 'required|integer',
        ];
    }

    /**
     * @return array<string, string>
     */
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
