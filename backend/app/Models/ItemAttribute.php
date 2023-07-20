<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemAttribute extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_attributes_id';
    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'category_id',
        'attribute_name',
        'attribute_value',];
}
