<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorTagRelation extends Model
{
    use HasFactory;

    protected $primaryKey = 'color_tag_relations_id';
    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'color_tag_id',
    ];
}
