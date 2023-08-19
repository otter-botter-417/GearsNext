<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

/**
 * レイアウトの閲覧履歴に関するモデルクラスです。
 * @package App\Models
 * @property int $view_layout_history_id
 * @property int $user_id
 * @property int $layout_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class ViewLayoutHistory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'layout_id'];

    /**
     * ユーザーに紐づくレイアウトの閲覧履歴を取得
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * レイアウトに紐づくユーザーの閲覧履歴を取得
     * @return BelongsTo
     */
    public function layout(): BelongsTo
    {
        return $this->belongsTo(Layout::class);
    }
}
