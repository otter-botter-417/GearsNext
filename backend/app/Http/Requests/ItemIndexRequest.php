<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'categoryName' => 'string|max:50',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'categoryName.string' => 'カテゴリー名は文字列で入力してください',
            'categoryName.max' => 'カテゴリー名は50文字以内で入力してください',
        ];
    }
}
