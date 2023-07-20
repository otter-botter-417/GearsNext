<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'item_tag_name'
    ];
}
