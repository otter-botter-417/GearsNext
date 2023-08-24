<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * カテゴリーに関するモデルクラスです。
 * @package App\Models
 * @property int $category_id
 * @property string $category_name
 * @property Item[] $items
 */
class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';

    public $timestamps = false;

    protected $fillable = [
        'category_name'
    ];

    public function items()
    {
        return $this->hasMany(Item::class, 'category_id');
    }
}
