<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 商品タグに関するモデルクラスです。
 * @package App\Models
 * @property int $item_tag_id
 * @property string $item_tag_name
 * @property Item[] $items
 */
class ItemTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'item_tag_name'
    ];

    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_item_tag', 'item_tag_id', 'item_id');
    }
}
