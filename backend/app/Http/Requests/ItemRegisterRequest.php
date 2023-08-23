<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemRegisterRequest extends FormRequest
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
        $numericRule = 'required|numeric';

        return [
            'baseData.item_name' => 'required|string|max:255',
            'baseData.asin' => 'required|string|size:10',
            'baseData.image_name' => 'required|string|max:255',
            'baseData.price' => $numericRule,
            'baseData.open_width' => $numericRule,
            'baseData.open_depth' => $numericRule,
            'baseData.open_height' => $numericRule,
            'baseData.storage_width' => $numericRule,
            'baseData.storage_depth' => $numericRule,
            'baseData.storage_height' => $numericRule,
            'baseData.weight' => $numericRule,
            'baseData.brand_name' => 'required|string|max:50',
            'baseData.item_category_name' => 'required|string|max:50',
            'baseData.sub_category_name' => 'required|string|max:50',
            'itemTags.*' => 'string|max:50',
            'colorTags' => 'required',
            'colorTags.*' => 'string|max:20',
            'details.capacity' => 'numeric',
            'details.inner_tent' => 'string|max:255',
            'details.grand_sheet' => 'string|max:255',
            'details.fabrics' => 'string|max:255',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'baseData.item_name.required' => $this->requiredMessage('商品名'),
            'baseData.item_name.string' => $this->stringMessage('商品名'),
            'baseData.item_name.max' => '商品名は最大255文字までです。',
            'baseData.asin.required' => $this->requiredMessage('ASIN'),
            'baseData.asin.size' => 'ASINは10文字である必要があります。',
            'baseData.asin.string' => $this->stringMessage('ASIN'),
            'baseData.image_name.required' => $this->requiredMessage('画像名'),
            'baseData.image_name.max' => '画像名は最大255文字までです。',
            'baseData.image_name.string' => $this->stringMessage('画像名'),
            'baseData.price.required' => $this->requiredMessage('価格'),
            'baseData.price.numeric' => $this->numericMessage('価格'),
            'baseData.open_width.required' => $this->requiredMessage('展開時の幅'),
            'baseData.open_width.numeric' => $this->numericMessage('展開時の幅'),
            'baseData.open_depth.required' => $this->requiredMessage('展開時の奥行き'),
            'baseData.open_depth.numeric' => $this->numericMessage('展開時の奥行き'),
            'baseData.open_height.required' => $this->requiredMessage('展開時の高さ'),
            'baseData.open_height.numeric' => $this->numericMessage('展開時の高さ'),
            'baseData.storage_width.required' => $this->requiredMessage('収納時の幅'),
            'baseData.storage_width.numeric' => $this->numericMessage('収納時の幅'),
            'baseData.storage_depth.required' => $this->requiredMessage('収納時の奥行き'),
            'baseData.storage_depth.numeric' => $this->numericMessage('収納時の奥行き'),
            'baseData.storage_height.required' => $this->requiredMessage('収納時の高さ'),
            'baseData.storage_height.numeric' => $this->numericMessage('収納時の高さ'),
            'baseData.weight.required' => $this->requiredMessage('重量'),
            'baseData.weight.numeric' => $this->numericMessage('重量'),
            'baseData.brand_name.required' => $this->requiredMessage('ブランド名'),
            'baseData.brand_name.string' => $this->stringMessage('画像名'),
            'baseData.brand_name.max' => 'ブランド名は最大50文字までです。',
            'baseData.item_category_name.required' => $this->requiredMessage('商品カテゴリー名'),
            'baseData.item_category_name.string' => $this->stringMessage('商品カテゴリー名'),
            'baseData.item_category_name.max' => '商品カテゴリー名は最大50文字までです。',
            'baseData.sub_category_name.required' => $this->requiredMessage('サブカテゴリー名'),
            'baseData.sub_category_name.string' => $this->stringMessage('サブカテゴリー名'),
            'baseData.sub_category_name.max' => 'サブカテゴリー名は最大50文字までです。',
            'itemTags.*.max' => 'アイテムタグは最大50文字までです。',
            'itemTags.*.string' => $this->stringMessage('アイテムタグ'),
            'colorTags.required' => $this->requiredMessage('カラータグ'),
            'colorTags.*.max' => 'カラータグは最大20文字までです。',
            'colorTags.*.string' => $this->stringMessage('カラータグ'),
            'details.capacity.numeric' => $this->numericMessage('容量'),
            'details.inner_tent.max' => 'インナーテントの詳細は最大255文字までです。',
            'details.inner_tent.string' => $this->stringMessage('インナーテントの詳細'),
            'details.grand_sheet.max' => 'グランドシートの詳細は最大255文字までです。',
            'details.grand_sheet.string' => $this->stringMessage('グランドシートの詳細'),
            'details.fabrics.max' => '素材の詳細は最大255文字までです。',
            'details.fabrics.string' => $this->stringMessage('素材の詳細')
        ];
    }
    private function stringMessage(string $field): string
    {
        return "{$field}は文字列である必要があります。";
    }
    private function numericMessage(string $field): string
    {
        return "{$field}は数値である必要があります。";
    }
    private function requiredMessage(string $field): string
    {
        return "{$field}は必須です。";
    }
}
