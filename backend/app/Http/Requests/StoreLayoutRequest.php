<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Validation\Validator;

/**
 * レイアウトの投稿に関するリクエストクラスです。
 * このクラスではレイアウトの投稿に関するバリデーションを提供します。
 * レイアウトの投稿は認証が必要です。
 * 
 * LayoutControllerのstoreメソッドで使用します。
 */
class StoreLayoutRequest extends FormRequest
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
            'layout_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'text' => 'nullable|string|max:255',
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
    protected function failedValidation(Validator $validator)
    {
        // エラーメッセージをログに出力
        Log::error('Validation Error: ', $validator->errors()->toArray());

        // デフォルトのバリデーションエラーレスポンス
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
    
}
