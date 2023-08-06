<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'userFirebaseId.required' => 'firebaseIDは必須です。',
            'userFirebaseId.string' => 'firebaseIDは文字列である必要があります。',
            'name.required' => '名前は必須です。',
            'name.string' => '名前は文字列である必要があります。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => 'メールアドレスの形式が正しくありません。',
        ];
    }
}
