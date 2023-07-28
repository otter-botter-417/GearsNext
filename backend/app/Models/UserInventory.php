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
        'item_id',];

        public function items()
        {
            // return $this->belongsToMany(Item::class, 'items', 'item_id', 'item_id');
            return $this->belongsTo(Item::class, 'item_id');

        }
        
}
