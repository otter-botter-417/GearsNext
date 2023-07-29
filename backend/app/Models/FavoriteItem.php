<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class FavoriteItem extends Model
{
    use HasFactory;
    protected $primaryKey = 'favorite_items_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    // リレーション
    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }

    // 既にテーブルに追加されているか確認
    public static function alreadyExists($userId, $itemId)
    {
        return self::where('user_id', $userId)
            ->where('item_id', $itemId)
            ->exists();
    }
}
