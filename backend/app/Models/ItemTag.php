<?php

namespace App\Models;

use App\Exceptions\ItemTagNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ItemTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'item_tag_name'
    ];

    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_item_tag', 'item_tag_id', 'item_id');
    }
}
