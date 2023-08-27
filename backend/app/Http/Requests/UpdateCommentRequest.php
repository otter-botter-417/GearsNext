<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * レイアウトへのコメントの更新に関するリクエストクラスです。
 * このクラスではレイアウトへのコメントの更新に関するバリデーションを提供します。
 * レイアウトへのコメントの更新は認証が必要です。
 * 
 * CommentControllerのupdateメソッドで使用します。
 */
class UpdateCommentRequest extends FormRequest
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
            'content' => 'required|string|max:255|not_regex:/<[a-z][\s\S]*>/i',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'content.required' => 'コメントは必須です。',
            'content.string' => 'コメントは文字列である必要があります。',
            'content.max' => 'コメントは最大255文字までです。',
            'content.not_regex' => 'HTMLタグは許可されていません。',
        ];
    }
}
