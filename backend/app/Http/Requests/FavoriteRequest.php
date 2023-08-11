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
            'userFirebaseId' => 'required|string',
            'itemId' => 'required|integer',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'userFirebaseId.required' => 'ユーザーIDは必須です。',
            'userFirebaseId.string'  => 'ユーザーIDは文字列である必要があります。',
            'itemId.required' => 'アイテムIDは必須です。',
            'itemId.integer'  => 'アイテムIDは整数である必要があります。',
        ];
    }
}
