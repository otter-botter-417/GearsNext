<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'userName' => 'required|string|max:50',
            'email' => 'required|email|max:255|unique:users,email,',
            'password' => 'required|string|between:6,100',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'userName.required' => '名前は必須です。',
            'userName.string' => '名前は文字列である必要があります。',
            'userName.max' => '名前は20文字以内である必要があります。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => 'メールアドレスの形式が正しくありません。',
            'email.max' => 'メールアドレスは255文字以内である必要があります。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'password.required' => 'パスワードは必須です。',
            'password.string' => 'パスワードは文字列である必要があります。',
            'password.between' => 'パスワードは6文字以上100文字以内である必要があります。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
