<?php

namespace App\Models;

use App\Exceptions\ColorTagNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ColorTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'color_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'color_tag_name'
    ];


    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_color_tag', 'color_tag_id', 'item_id');
    }
}
