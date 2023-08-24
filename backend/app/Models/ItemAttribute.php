<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 商品属性に関するモデルクラスです。
 * @package App\Models
 * @property int $item_attributes_id
 * @property int $item_id
 * @property int $category_id
 * @property string $attribute_name
 * @property string $attribute_value
 */
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
}
