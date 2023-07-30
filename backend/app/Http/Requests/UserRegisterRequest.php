<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
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
            'userFirebaseId' => 'required|string',
            'name' => 'required|string',
            'email' => 'required|email',
        ];
    }
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
