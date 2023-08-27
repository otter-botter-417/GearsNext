<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * ユーザーの登録に関するリクエストクラスです。
 * このクラスではユーザーの登録に関するバリデーションを提供します。
 * 
 * UserControllerのregisterメソッドで使用します。
 */
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
            'user_name' => 'required|string|between:1,30|unique:users,user_name',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|between:6,30|confirmed',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'user_name.required' => '名前は必須です。',
            'user_name.string' => '名前は文字列である必要があります。',
            'user_name.between' => '名前は1文字以上、30文字以内である必要があります。',
            'user_name.unique' => 'このユーザー名は既に登録されています。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => 'メールアドレスの形式が正しくありません。',
            'email.max' => 'メールアドレスは255文字以内である必要があります。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'password.required' => 'パスワードは必須です。',
            'password.string' => 'パスワードは文字列である必要があります。',
            'password.between' => 'パスワードは6文字以上30文字以内である必要があります。',
            'password.confirmed' => 'パスワードの確認が一致しません。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
