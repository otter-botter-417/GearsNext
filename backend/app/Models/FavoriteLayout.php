<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ユーザーのお気に入りレイアウトに関するモデルクラスです。
 * @package App\Models
 * @property int $favorite_layouts_id
 * @property int $user_id
 * @property int $layout_id
 * @property Layout $layout
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class FavoriteLayout extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'favorite_layouts_id';

    protected $fillable = [
        'user_id',
        'layout_id',
    ];

    public function layout()
    {
        return $this->belongsTo(Layout::class, 'layout_id');
    }
}
