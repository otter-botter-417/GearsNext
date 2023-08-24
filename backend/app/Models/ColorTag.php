<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * カラータグに関するモデルクラスです。
 * @package App\Models
 * @property int $color_tag_id
 * @property string $color_tag_name
 * @property Item[] $items
 */
class ColorTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'color_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'color_tag_name'
    ];


    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_color_tag', 'color_tag_id', 'item_id');
    }
}
