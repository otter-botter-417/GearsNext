<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagPosition extends Model
{
    use HasFactory;

    protected $fillable = [
        'layout_id',
        'item_id',
        'x_position',
        'y_position',
    ];

    public function layout()
    {
        return $this->belongsTo(Layout::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
