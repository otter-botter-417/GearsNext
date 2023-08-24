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
        $baseDataRules = 'required|string';
        $numericRule = 'required|numeric|min:0';

        return [
            'itemData.baseData.item_name' => $baseDataRules . '|max:255',
            'itemData.baseData.asin' => $baseDataRules . '|size:10',
            'itemData.baseData.image_name' => $baseDataRules . '|max:255',
            'itemData.baseData.price' => $numericRule,
            'itemData.baseData.open_width' => $numericRule,
            'itemData.baseData.open_depth' => $numericRule,
            'itemData.baseData.open_height' => $numericRule,
            'itemData.baseData.storage_width' => $numericRule,
            'itemData.baseData.storage_depth' => $numericRule,
            'itemData.baseData.storage_height' => $numericRule,
            'itemData.baseData.weight' => $numericRule,
            'itemData.baseData.brand_name' => $baseDataRules . '|max:50',
            'itemData.baseData.item_category_name' => $baseDataRules . '|max:50',
            'itemData.baseData.sub_category_name' => $baseDataRules . '|max:50',
            'itemData.itemTags.*' => 'string|max:50',
            'itemData.colorTags' => 'required',
            'itemData.colorTags.*' => 'string|max:20',
            'itemData.details.capacity' => 'numeric',
            'itemData.details.inner_tent' => 'string|max:255',
            'itemData.details.grand_sheet' => 'string|max:255',
            'itemData.details.fabrics' => 'string|max:255',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'itemData.baseData.item_name.required' => $this->generateMessage('required', '商品名'),
            'itemData.baseData.item_name.string' => $this->generateMessage('string', '商品名'),
            'itemData.baseData.item_name.max' => $this->generateMessage('max', '商品名', '255'),
            'itemData.baseData.asin.required' => $this->generateMessage('required', 'ASIN'),
            'itemData.baseData.asin.size' => 'ASINは10文字である必要があります。',
            'itemData.baseData.asin.string' => $this->generateMessage('string', 'ASIN'),
            'itemData.baseData.image_name.required' => $this->generateMessage('required', '画像名'),
            'itemData.baseData.image_name.max' => $this->generateMessage('max', '画像名', '255'),
            'itemData.baseData.image_name.string' => $this->generateMessage('string', '画像名'),
            'itemData.baseData.price.required' => $this->generateMessage('required', '価格'),
            'itemData.baseData.price.numeric' => $this->generateMessage('numeric', '価格'),
            'itemData.baseData.open_width.required' => $this->generateMessage('required', '展開時の幅'),
            'itemData.baseData.open_width.numeric' => $this->generateMessage('numeric', '展開時の幅'),
            'itemData.baseData.open_depth.required' => $this->generateMessage('required', '展開時の奥行き'),
            'itemData.baseData.open_depth.numeric' => $this->generateMessage('numeric', '展開時の奥行き'),
            'itemData.baseData.open_height.required' => $this->generateMessage('required', '展開時の高さ'),
            'itemData.baseData.open_height.numeric' => $this->generateMessage('numeric', '展開時の高さ'),
            'itemData.baseData.storage_width.required' => $this->generateMessage('required', '収納時の幅'),
            'itemData.baseData.storage_width.numeric' => $this->generateMessage('numeric', '収納時の幅'),
            'itemData.baseData.storage_depth.required' => $this->generateMessage('required', '収納時の奥行き'),
            'itemData.baseData.storage_depth.numeric' => $this->generateMessage('numeric', '収納時の奥行き'),
            'itemData.baseData.storage_height.required' => $this->generateMessage('required', '収納時の高さ'),
            'itemData.baseData.storage_height.numeric' => $this->generateMessage('numeric', '収納時の高さ'),
            'itemData.baseData.weight.required' => $this->generateMessage('required', '重量'),
            'itemData.baseData.weight.numeric' => $this->generateMessage('numeric', '重量'),
            'itemData.baseData.brand_name.required' => $this->generateMessage('required', 'ブランド名'),
            'itemData.baseData.brand_name.string' => $this->generateMessage('string', '画像名'),
            'itemData.baseData.brand_name.max' => $this->generateMessage('max', 'ブランド名', '50'),
            'itemData.baseData.item_category_name.required' => $this->generateMessage('required', '商品カテゴリー名'),
            'itemData.baseData.item_category_name.string' => $this->generateMessage('string', '商品カテゴリー名'),
            'itemData.baseData.item_category_name.max' => $this->generateMessage('max', '商品カテゴリー名', '50'),
            'itemData.baseData.sub_category_name.required' => $this->generateMessage('required', 'サブカテゴリー名'),
            'itemData.baseData.sub_category_name.string' => $this->generateMessage('string', 'サブカテゴリー名'),
            'itemData.baseData.sub_category_name.max' => $this->generateMessage('max', 'サブカテゴリー名', '50'),

            'itemData.itemTags.*.max' => $this->generateMessage('max', 'アイテムタグ', '50'),
            'itemData.itemTags.*.string' => $this->generateMessage('string', 'アイテムタグ'),

            'itemData.colorTags.required' => $this->generateMessage('required', 'カラータグ'),
            'itemData.colorTags.*.max' => $this->generateMessage('max', 'カラータグ', '20'),
            'itemData.colorTags.*.string' => $this->generateMessage('string', 'カラータグ'),

            'itemData.details.capacity.numeric' => $this->generateMessage('numeric', '容量'),
            'itemData.details.inner_tent.max' => $this->generateMessage('max', 'インナーテントの詳細', '255'),
            'itemData.details.inner_tent.string' => $this->generateMessage('string', 'インナーテントの詳細'),
            'itemData.details.grand_sheet.max' => $this->generateMessage('max', 'グランドシートの詳細', '255'),
            'itemData.details.grand_sheet.string' => $this->generateMessage('string', 'グランドシートの詳細'),
            'itemData.details.fabrics.max' => $this->generateMessage('max', '素材の詳細', '255'),
            'itemData.details.fabrics.string' => $this->generateMessage('string', '素材の詳細')
        ];
    }

    /**
     * ルールに対するメッセージを生成する
     * @param string $rule ルール名
     * @param string $field フィールド名
     * @param string|null $size フィールドのサイズ
     * @return string
     */
    private function generateMessage(string $rule, string $field, string $size = null): string
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
            default:
                return "{$field}には未定義のルールが適用されています。";
        }
    }
}
