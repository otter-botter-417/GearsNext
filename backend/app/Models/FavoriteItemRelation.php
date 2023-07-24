<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteItemRelation extends Model
{
    use HasFactory;
    protected $primaryKey = 'favorite_item_relations';

    protected $fillable = [
        'user_id',
        'item_id',];


}