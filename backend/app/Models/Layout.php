<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * レイアウトに関するモデルクラスです。
 * @package App\Models
 * @property int $layout_id
 * @property string $text
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * 
 */

class Layout extends Model
{
    use HasFactory;

    protected $primaryKey = 'layout_id';

    protected $fillable = [
        'text',
        'user_id',
    ];

    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_layout', 'layout_id', 'item_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tagPositions()
    {
        return $this->hasMany(TagPosition::class, 'layout_id');
    }
}
