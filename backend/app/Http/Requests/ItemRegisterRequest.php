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
            'itemDatas.colorTags' => 'required',
            'itemDatas.colorTags.*' => 'string|max:20',
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
            'itemDatas.itemName.string' => '商品名は文字列でなければなりません。',
            'itemDatas.itemName.max' => '商品名は最大255文字までです。',
            'itemDatas.asin.required' => 'ASINは必須です。',
            'itemDatas.asin.size' => 'ASINは10文字でなければなりません。',
            'itemDatas.asin.string' => 'ASINは文字列でなければなりません。',
            'itemDatas.imageName.required' => '画像名は必須です。',
            'itemDatas.imageName.max' => '画像名は最大255文字までです。',
            'itemDatas.imageName.string' => '画像名は文字列でなければなりません。',
            'itemDatas.price.required' => '価格は必須です。',
            'itemDatas.price.numeric' => '価格は数値でなければなりません。',
            'itemDatas.openWidth.required' => '展開時の幅は必須です。',
            'itemDatas.openWidth.numeric' => '展開時の幅は数値でなければなりません。',
            'itemDatas.openDepth.required' => '展開時の奥行きは必須です。',
            'itemDatas.openDepth.numeric' => '展開時の奥行きは数値でなければなりません。',
            'itemDatas.openHeight.required' => '展開時の高さは必須です。',
            'itemDatas.openHeight.numeric' => '展開時の高さは数値でなければなりません。',
            'itemDatas.storageWidth.required' => '収納時の幅は必須です。',
            'itemDatas.storageWidth.numeric' => '収納時の幅は数値でなければなりません。',
            'itemDatas.storageDepth.required' => '収納時の奥行きは必須です。',
            'itemDatas.storageDepth.numeric' => '収納時の奥行きは数値でなければなりません。',
            'itemDatas.storageHeight.required' => '収納時の高さは必須です。',
            'itemDatas.storageHeight.numeric' => '収納時の高さは数値でなければなりません。',
            'itemDatas.weight.required' => '重量は必須です。',
            'itemDatas.weight.numeric' => '重量は数値でなければなりません。',
            'itemDatas.brandName.required' => 'ブランド名は必須です。',
            'itemDatas.brandName.string' => 'ブランド名は文字列でなければなりません。',
            'itemDatas.brandName.max' => 'ブランド名は最大50文字までです。',
            'itemDatas.brandName.string' => 'ブランド名は文字列でなければなりません。',
            'itemDatas.itemCategoryName.required' => '商品カテゴリー名は必須です。',
            'itemDatas.itemCategoryName.string' => '商品カテゴリー名は文字列でなければなりません。',
            'itemDatas.itemCategoryName.max' => '商品カテゴリー名は最大50文字までです。',
            'itemDatas.subCategoryName.required' => 'サブカテゴリー名は必須です。',
            'itemDatas.subCategoryName.string' => 'サブカテゴリー名は文字列でなければなりません。',
            'itemDatas.subCategoryName.max' => 'サブカテゴリー名は最大50文字までです。',
            'itemDatas.itemTags.*.max' => 'アイテムタグは最大50文字までです。',
            'itemDatas.itemTags.*.string' => 'アイテムタグは文字列でなければなりません。',
            'itemDatas.colorTags.required' => 'カラータグは必須です。',
            'itemDatas.colorTags.*.max' => 'カラータグは最大20文字までです。',
            'itemDatas.colorTags.*.string' => 'カラータグは文字列でなければなりません。',
            'itemDatas.details.capacity.numeric' => '容量は数値でなければなりません。',
            'itemDatas.details.innerTent.max' => 'インナーテントの詳細は最大255文字までです。',
            'itemDatas.details.innerTent.string' => 'インナーテントの詳細は文字列でなければなりません。',
            'itemDatas.details.grandSheet.max' => 'グランドシートの詳細は最大255文字までです。',
            'itemDatas.details.grandSheet.string' => 'グランドシートの詳細は文字列でなければなりません。',
            'itemDatas.details.fabrics.max' => '素材の詳細は最大255文字までです。',
            'itemDatas.details.fabrics.string' => '素材の詳細は文字列でなければなりません。'
        ];
    }
}
