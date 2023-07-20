<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemTagRelation extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_tag_relations_id';
    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'item_tag_id',];
}
