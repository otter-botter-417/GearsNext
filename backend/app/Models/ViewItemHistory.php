<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

/**
 * 商品の閲覧履歴に関するモデルクラスです。
 * @package App\Models
 * @property int $view_item_history_id
 * @property int $user_id
 * @property int $item_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class ViewItemHistory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'item_id'];

    /**
     * ユーザーに紐づく商品の閲覧履歴を取得
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 商品に紐づくユーザーの閲覧履歴を取得
     * @return BelongsTo
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
