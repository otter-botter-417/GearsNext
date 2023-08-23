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
            'baseData.*' => 'required',
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
            'baseData.item_name.required' => $this->generateMessage('required', '商品名'),
            'baseData.item_name.string' => $this->generateMessage('string', '商品名'),
            'baseData.item_name.max' => $this->generateMessage('max', '商品名', '255'),
            'baseData.asin.required' => $this->generateMessage('required', 'ASIN'),
            'baseData.asin.size' => 'ASINは10文字である必要があります。',
            'baseData.asin.string' => $this->generateMessage('string', 'ASIN'),
            'baseData.image_name.required' => $this->generateMessage('required', '画像名'),
            'baseData.image_name.max' => $this->generateMessage('max', '画像名', '255'),
            'baseData.image_name.string' => $this->generateMessage('string', '画像名'),
            'baseData.price.required' => $this->generateMessage('required', '価格'),
            'baseData.price.numeric' => $this->generateMessage('numeric', '価格'),
            'baseData.open_width.required' => $this->generateMessage('required', '展開時の幅'),
            'baseData.open_width.numeric' => $this->generateMessage('numeric', '展開時の幅'),
            'baseData.open_depth.required' => $this->generateMessage('required', '展開時の奥行き'),
            'baseData.open_depth.numeric' => $this->generateMessage('numeric', '展開時の奥行き'),
            'baseData.open_height.required' => $this->generateMessage('required', '展開時の高さ'),
            'baseData.open_height.numeric' => $this->generateMessage('numeric', '展開時の高さ'),
            'baseData.storage_width.required' => $this->generateMessage('required', '収納時の幅'),
            'baseData.storage_width.numeric' => $this->generateMessage('numeric', '収納時の幅'),
            'baseData.storage_depth.required' => $this->generateMessage('required', '収納時の奥行き'),
            'baseData.storage_depth.numeric' => $this->generateMessage('numeric', '収納時の奥行き'),
            'baseData.storage_height.required' => $this->generateMessage('required', '収納時の高さ'),
            'baseData.storage_height.numeric' => $this->generateMessage('numeric', '収納時の高さ'),
            'baseData.weight.required' => $this->generateMessage('required', '重量'),
            'baseData.weight.numeric' => $this->generateMessage('numeric', '重量'),
            'baseData.brand_name.required' => $this->generateMessage('required', 'ブランド名'),
            'baseData.brand_name.string' => $this->generateMessage('string', '画像名'),
            'baseData.brand_name.max' => $this->generateMessage('max', 'ブランド名', '50'),
            'baseData.item_category_name.required' => $this->generateMessage('required', '商品カテゴリー名'),
            'baseData.item_category_name.string' => $this->generateMessage('string', '商品カテゴリー名'),
            'baseData.item_category_name.max' => $this->generateMessage('max', '商品カテゴリー名', '50'),
            'baseData.sub_category_name.required' => $this->generateMessage('required', 'サブカテゴリー名'),
            'baseData.sub_category_name.string' => $this->generateMessage('string', 'サブカテゴリー名'),
            'baseData.sub_category_name.max' => $this->generateMessage('max', 'サブカテゴリー名', '50'),

            'itemTags.*.max' => $this->generateMessage('max', 'アイテムタグ', '50'),
            'itemTags.*.string' => $this->generateMessage('string', 'アイテムタグ'),

            'colorTags.required' => $this->generateMessage('required', 'カラータグ'),
            'colorTags.*.max' => $this->generateMessage('max', 'カラータグ', '20'),
            'colorTags.*.string' => $this->generateMessage('string', 'カラータグ'),

            'details.capacity.numeric' => $this->generateMessage('numeric', '容量'),
            'details.inner_tent.max' => $this->generateMessage('max', 'インナーテントの詳細', '255'),
            'details.inner_tent.string' => $this->generateMessage('string', 'インナーテントの詳細'),
            'details.grand_sheet.max' => $this->generateMessage('max', 'グランドシートの詳細', '255'),
            'details.grand_sheet.string' => $this->generateMessage('string', 'グランドシートの詳細'),
            'details.fabrics.max' => $this->generateMessage('max', '素材の詳細', '255'),
            'details.fabrics.string' => $this->generateMessage('string', '素材の詳細')
        ];
    }

    private function generateMessage(string $field, string $rule, string $size = null): string
    {
        switch ($rule) {
            case 'required':
                return "{$field}は必須です。";
            case 'string':
                return "{$field}は文字列である必要があります。";
            case 'numeric':
                return "{$field}は数値である必要があります。";
            case 'max':
                return "{$field}は最大{$size}文字までです。";
        }
    }
}
