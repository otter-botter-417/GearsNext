<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'Item_name',
        'brand_id',
        'price',
        'image_name',
        'asin',
        'size_id',
        'category_id',
        'sub_category_id',
    ];
    
}
