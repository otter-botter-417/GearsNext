<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * お気に入りアイテムに関するモデルクラスです。
 * @package App\Models
 * @property int $favorite_items_id
 * @property int $user_id
 * @property int $item_id
 * @property Item $item
 * @property User $user
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class FavoriteItem extends Model
{
    use HasFactory;

    protected $primaryKey = 'favorite_items_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
