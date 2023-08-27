<?php

namespace App\Http\Requests;

use App\Models\Comment;
use Illuminate\Foundation\Http\FormRequest;

/**
 * レイアウトへのコメントの投稿に関するリクエストクラスです。
 * このクラスではレイアウトへのコメントの投稿に関するバリデーションを提供します。
 * レイアウトへのコメントの投稿は認証が必要です。
 * 
 * CommentControllerのstoreメソッドで使用します。
 */
class StoreCommentRequest extends FormRequest
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
            'content' => 'required|string|max:255|not_regex:/<[a-z][\s\S]*>/i',
            'parent_id' => [
                'nullable',
                'numeric',
                'min:0',
                // TODO 無名関数
                function ($attribute, $value, $fail) {
                    if (!is_null($value) && !Comment::find($value)) {
                        $fail($attribute . 'が存在しない値です。');
                    }
                },
            ],
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
            'parent_id.numeric' => 'parent_idは数値である必要があります。',
            'parent_id.min' => 'parent_idは0以上の数値である必要があります。',
        ];
    }
}
