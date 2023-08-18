<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLayoutRequest extends FormRequest
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
            'text' => 'string|max:255',
            'items' => 'required|array',
            'items.*.item_id' => 'required|integer',
            'items.*.x_position' => 'required|integer',
            'items.*.y_position' => 'required|integer',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'text.string' => 'テキストは文字列である必要があります。',
            'text.max' => 'テキストは255文字以内である必要があります。',
            'items.required' => '商品情報は必須です',
            'items.array' => '商品情報は配列である必要があります。',
            'items.*.item_id.required' => '商品IDは必須です',
            'items.*.item_id.integer' => '商品IDは整数である必要があります。',
            'items.*.x_position.required' => 'X座標は必須です',
            'items.*.x_position.integer' => 'X座標は整数である必要があります。',
            'items.*.y_position.required' => 'Y座標は必須です',
            'items.*.y_position.integer' => 'Y座標は整数である必要があります。',

        ];
    }
}
