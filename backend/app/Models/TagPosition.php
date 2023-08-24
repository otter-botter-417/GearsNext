<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 画像のタグ位置に関するモデルクラスです。
 * @package App\Models
 * @property int $tag_position_id
 * @property int $layout_id
 * @property int $item_id
 * @property int $x_position
 * @property int $y_position
 * @property Layout $layout
 * @property Item $item
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class TagPosition extends Model
{
    use HasFactory;

    protected $fillable = [
        'layout_id',
        'item_id',
        'x_position',
        'y_position',
    ];

    public function layout()
    {
        return $this->belongsTo(Layout::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
