<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * 商品一覧の取得に関するリクエストクラスです。
 * このクラスでは商品一覧の取得に関するバリデーションを提供します。
 * カテゴリー名のバリデーションはカテゴリー名が指定されている場合のみ行います。
 * カテゴリー名が指定されていない場合はバリデーションを行いません。
 * 
 * ItemControllerのindexメソッドで使用します。
 */
class ItemIndexRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * @return array<string, string>
     */
    public function rules()
    {
        return [
            'category_name' => 'string|max:50',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'category_name.string' => 'カテゴリー名は文字列で入力してください',
            'category_name.max' => 'カテゴリー名は50文字以内で入力してください',
        ];
    }
}
