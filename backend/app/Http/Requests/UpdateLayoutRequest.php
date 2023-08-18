<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLayoutRequest extends FormRequest
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
            'itemIds' => 'array',
            'itemIds.*' => 'integer',
            'text' => 'string|max:255',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'itemId.array' => '商品IDは配列である必要があります。',
            'itemId.*.integer' => '商品IDは整数である必要があります。',
            'text.string' => 'テキストは文字列である必要があります。',
            'text.max' => 'テキストは255文字以内である必要があります。',
        ];
    }
}
