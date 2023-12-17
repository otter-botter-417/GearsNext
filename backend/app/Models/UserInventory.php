<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ユーザーの所持アイテムに関するモデルクラスです。
 * @package App\Models
 * @property int $user_inventories_id
 * @property int $user_id
 * @property int $item_id
 * @property Item $items
 */
class UserInventory extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_inventories_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
    
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
