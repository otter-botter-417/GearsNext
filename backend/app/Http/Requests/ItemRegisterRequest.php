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
        return [
            'itemDatas.itemName' => 'required|string|max:255',
            'itemDatas.asin' => 'required|string|size:10',
            'itemDatas.imageName' => 'required|string|max:255',
            'itemDatas.price' => 'required|numeric',
            'itemDatas.openWidth' => 'required|numeric',
            'itemDatas.openDepth' => 'required|numeric',
            'itemDatas.openHeight' => 'required|numeric',
            'itemDatas.storageWidth' => 'required|numeric',
            'itemDatas.storageDepth' => 'required|numeric',
            'itemDatas.storageHeight' => 'required|numeric',
            'itemDatas.weight' => 'required|numeric',
            'itemDatas.brandName' => 'required|string|max:50',
            'itemDatas.itemCategoryName' => 'required|string|max:50',
            'itemDatas.subCategoryName' => 'required|string|max:50',
            'itemDatas.itemTags.*' => 'string|max:50',
            'itemDatas.colorTags.*' => 'required|string|max:20',
            'itemDatas.details.capacity' => 'numeric',
            'itemDatas.details.innerTent' => 'string|max:255',
            'itemDatas.details.grandSheet' => 'string|max:255',
            'itemDatas.details.fabrics' => 'string|max:255',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'itemDatas.itemName.required' => '商品名は必須です。',
            'itemDatas.itemName.max' => '商品名は最大255文字までです。',
            'itemDatas.asin.required' => 'ASINは必須です。',
            'itemDatas.asin.size' => 'ASINは10文字でなければなりません。',
            'itemDatas.imageName.required' => '画像名は必須です。',
            'itemDatas.imageName.max' => '画像名は最大255文字までです。',
            'itemDatas.price.required' => '価格は必須です。',
            'itemDatas.openWidth.required' => '開封時の幅は必須です。',
            'itemDatas.openDepth.required' => '開封時の奥行きは必須です。',
            'itemDatas.openHeight.required' => '開封時の高さは必須です。',
            'itemDatas.storageWidth.required' => '収納時の幅は必須です。',
            'itemDatas.storageDepth.required' => '収納時の奥行きは必須です。',
            'itemDatas.storageHeight.required' => '収納時の高さは必須です。',
            'itemDatas.weight.required' => '重量は必須です。',
            'itemDatas.brandName.required' => 'ブランド名は必須です。',
            'itemDatas.brandName.max' => 'ブランド名は最大50文字までです。',
            'itemDatas.itemCategoryName.required' => '商品カテゴリ名は必須です。',
            'itemDatas.itemCategoryName.max' => '商品カテゴリ名は最大50文字までです。',
            'itemDatas.subCategoryName.required' => 'サブカテゴリ名は必須です。',
            'itemDatas.subCategoryName.max' => 'サブカテゴリ名は最大50文字までです。',
            'itemDatas.itemTags.*.max' => 'アイテムタグは最大50文字までです。',
            'itemDatas.colorTags.*.required' => 'カラータグは必須です。',
            'itemDatas.colorTags.*.max' => 'カラータグは最大20文字までです。',
            'itemDatas.details.capacity.numeric' => '容量は数値で入力してください。',
            'itemDatas.details.innerTent.max' => 'インナーテントの詳細は最大255文字までです。',
            'itemDatas.details.grandSheet.max' => 'グランドシートの詳細は最大255文字までです。',
            'itemDatas.details.fabrics.max' => '素材の詳細は最大255文字までです。'
        ];
    }
}
