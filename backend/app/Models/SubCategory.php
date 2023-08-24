<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * サブカテゴリーに関するモデルクラスです。
 * @package App\Models
 * @property int $sub_category_id
 * @property string $sub_category_name
 * @property Item[] $items
 */
class SubCategory extends Model
{
    use HasFactory;

    protected $primaryKey = 'sub_category_id';
    public $timestamps = false;

    protected $fillable = [
        'sub_category_name'
    ];

    public function items()
    {
        return $this->hasMany(Item::class, 'category_id');
    }
}
