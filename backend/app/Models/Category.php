<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';
    public $timestamps = false;

    protected $fillable = [
        'category_name'
    ];

    // カテゴリーIDに紐づく商品を取得
    public function items()
    {
        return $this->hasMany(Item::class, 'category_id');
    }
}
