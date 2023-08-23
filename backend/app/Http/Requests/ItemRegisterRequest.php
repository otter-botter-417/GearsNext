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
            'baseData.image_ame' => 'required|string|max:255',
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
            'baseData.item_name.required' => '商品名は必須です。',
            'baseData.item_name.string' => '商品名は文字列である必要があります。',
            'baseData.item_name.max' => '商品名は最大255文字までです。',
            'baseData.asin.required' => 'ASINは必須です。',
            'baseData.asin.size' => 'ASINは10文字である必要があります。',
            'baseData.asin.string' => 'ASINは文字列である必要があります。',
            'baseData.image_name.required' => '画像名は必須です。',
            'baseData.image_name.max' => '画像名は最大255文字までです。',
            'baseData.image_name.string' => '画像名は文字列である必要があります。',
            'baseData.price.required' => '価格は必須です。',
            'baseData.price.numeric' => '価格は数値である必要があります。',
            'baseData.open_width.required' => '展開時の幅は必須です。',
            'baseData.open_width.numeric' => '展開時の幅は数値である必要があります。',
            'baseData.open_depth.required' => '展開時の奥行きは必須です。',
            'baseData.open_depth.numeric' => '展開時の奥行きは数値である必要があります。',
            'baseData.open_height.required' => '展開時の高さは必須です。',
            'baseData.open_height.numeric' => '展開時の高さは数値である必要があります。',
            'baseData.storage_width.required' => '収納時の幅は必須です。',
            'baseData.storage_width.numeric' => '収納時の幅は数値である必要があります。',
            'baseData.storage_depth.required' => '収納時の奥行きは必須です。',
            'baseData.storage_depth.numeric' => '収納時の奥行きは数値である必要があります。',
            'baseData.storage_height.required' => '収納時の高さは必須です。',
            'baseData.storage_height.numeric' => '収納時の高さは数値である必要があります。',
            'baseData.weight.required' => '重量は必須です。',
            'baseData.weight.numeric' => '重量は数値である必要があります。',
            'baseData.brand_name.required' => 'ブランド名は必須です。',
            'baseData.brand_name.string' => 'ブランド名は文字列である必要があります。',
            'baseData.brand_name.max' => 'ブランド名は最大50文字までです。',
            'baseData.brand_name.string' => 'ブランド名は文字列である必要があります。',
            'baseData.item_category_name.required' => '商品カテゴリー名は必須です。',
            'baseData.item_category_name.string' => '商品カテゴリー名は文字列である必要があります。',
            'baseData.item_category_name.max' => '商品カテゴリー名は最大50文字までです。',
            'baseData.sub_category_name.required' => 'サブカテゴリー名は必須です。',
            'baseData.sub_category_name.string' => 'サブカテゴリー名は文字列である必要があります。',
            'baseData.sub_category_name.max' => 'サブカテゴリー名は最大50文字までです。',
            'itemTags.*.max' => 'アイテムタグは最大50文字までです。',
            'itemTags.*.string' => 'アイテムタグは文字列である必要があります。',
            'colorTags.required' => 'カラータグは必須です。',
            'colorTags.*.max' => 'カラータグは最大20文字までです。',
            'colorTags.*.string' => 'カラータグは文字列である必要があります。',
            'details.capacity.numeric' => '容量は数値である必要があります。',
            'details.inner_tent.max' => 'インナーテントの詳細は最大255文字までです。',
            'details.inner_tent.string' => 'インナーテントの詳細は文字列である必要があります。',
            'details.grand_sheet.max' => 'グランドシートの詳細は最大255文字までです。',
            'details.grand_sheet.string' => 'グランドシートの詳細は文字列である必要があります。',
            'details.fabrics.max' => '素材の詳細は最大255文字までです。',
            'details.fabrics.string' => '素材の詳細は文字列である必要があります。'
        ];
    }
}
