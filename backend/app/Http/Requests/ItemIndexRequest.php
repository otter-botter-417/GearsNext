<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemIndexRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'categoryname' => 'string|max:50',
        ];
    }

    public function messages()
    {
        return [
            'categoryname.string' => 'カテゴリー名は文字列で入力してください',
            'categoryname.max' => 'カテゴリー名は50文字以内で入力してください',
        ];
    }
}
