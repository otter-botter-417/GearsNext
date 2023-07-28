<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteItem extends Model
{
    use HasFactory;
    protected $primaryKey = 'favorite_items_id';

    protected $fillable = [
        'user_id',
        'item_id',
    ];

    public function items()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
