<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class UserInventory extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_inventories_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    // リレーション
    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
