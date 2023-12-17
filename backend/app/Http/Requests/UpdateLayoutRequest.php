<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * レイアウトの更新に関するリクエストクラスです。
 * このクラスではレイアウトの更新に関するバリデーションを提供します。
 * レイアウトの更新は認証が必要です。
 * 
 * LayoutControllerのupdateメソッドで使用します。
 */
class UpdateLayoutRequest extends FormRequest
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
            'text' => 'nullable|string|max:255|not_regex:/<[a-z][\s\S]*>/i',
            'items' => 'array',
            'items.*.item_id' => 'integer',
            'image_map_positions' => 'array',
            'image_map_positions.*.item_id' => 'required|integer',
            'image_map_positions.*.item_name' => 'required|string',
            'image_map_positions.*.x_position' => 'required|numeric',
            'image_map_positions.*.y_position' => 'required|numeric',
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
            'text.not_regex' => 'テキストには無効なHTMLタグが含まれています。',
            'items.array' => '商品情報は配列である必要があります。',
            'items.*.item_id.integer' => '商品IDは整数である必要があります。',
            'image_map_positions.array' => '商品情報は配列である必要があります。',
            'image_map_positions.*.item_id.required' => '商品IDは必須です',
            'image_map_positions.*.item_id.integer' => '商品IDは整数である必要があります。',
            'image_map_positions.*.item_name.required' => '商品名は必須です',
            'image_map_positions.*.item_name.string' => '商品名は文字列である必要があります。',
            'image_map_positions.*.x_position.required' => 'X座標は必須です',
            'image_map_positions.*.x_position.numeric' => 'X座標は数値である必要があります。',
            'image_map_positions.*.y_position.required' => 'Y座標は必須です',
            'image_map_positions.*.y_position.numeric' => 'Y座標は数値である必要があります。',
        ];
    }
}
