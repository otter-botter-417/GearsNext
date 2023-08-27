<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * ユーザー情報の更新に関するリクエストクラスです。
 * このクラスではユーザー情報の更新に関するバリデーションを提供します。
 * ユーザー情報の更新は認証が必要です。
 * 
 * UserControllerのupdateメソッドで使用します。
 */
class UserUpdateRequest extends FormRequest
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
        $user = $this->user();
        return [
            'user_name' => 'string|between:1,30|unique:users,user_name,' . $user->user_id,
            'email' => 'email|max:255|unique:users,email,' . $user->user_id,
            'password' => 'string|between:6,30|confirmed',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'user_name.string' => '名前は文字列である必要があります。',
            'user_name.between' => '名前は1文字以上、30文字以内である必要があります。',
            'user_name.unique' => 'このユーザー名は既に登録されています。',
            'email.email' => 'メールアドレスの形式が正しくありません。',
            'email.max' => 'メールアドレスは255文字以内である必要があります。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'password.string' => 'パスワードは文字列である必要があります。',
            'password.between' => 'パスワードは6文字以上30文字以内である必要があります。',
            'password.confirmed' => 'パスワードの確認が一致しません。',
        ];
    }
}
