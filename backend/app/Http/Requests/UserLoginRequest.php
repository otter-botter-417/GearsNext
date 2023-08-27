<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * ユーザーのログインに関するリクエストクラスです。
 * このクラスではユーザーのログインに関するバリデーションを提供します。
 * 
 * UserControllerのloginメソッドで使用します。
 */
class UserLoginRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|max:255',
            'password' => 'required|string|between:6,30',
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => 'メールアドレスの形式が正しくありません。',
            'password.required' => 'パスワードは必須です。',
            'password.between' => 'パスワードは6文字以上30文字以内である必要があります。',
        ];
    }
}
