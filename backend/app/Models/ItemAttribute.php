<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemAttribute extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_attributes_id';

    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'category_id',
        'attribute_name',
        'attribute_value',
    ];

    /**
     * 商品の詳細を登録
     * @param  array $details
     * @param  int $categoryId
     * @return void
     */
    public function addItemAttributes($details, $categoryId)
    {
        foreach ($details as $attributeName => $attributeValue) {
            $this->itemAttributes()->create([
                'category_id' => $categoryId,
                'attribute_name' => $attributeName,
                'attribute_value' => $attributeValue
            ]);
        }
    }
}
