<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $primaryKey = 'item_id';

    protected $fillable = [
        'item_name',
        // 'brand_id',
        'price',
        'image_name',
        'asin',
        'open_width',
        'open_depth',
        'open_height',
        'storage_width',
        'storage_depth',
        'storage_height',
        'weight',
        // 'category_id',
        // 'sub_category_id',
    ];

    // APIレスポンスから除外する属性
    protected $hidden = ['brand_id', 'category_id', 'sub_category_id'];
    
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function itemTags()
    {
        return $this->belongsToMany(ItemTag::class, 'item_tag_relations', 'item_id', 'item_tag_id');
    }
    public function colorTags()
    {
        return $this->belongsToMany(ItemTag::class, 'color_tag_relations', 'item_id', 'color_tag_id');
    }
    public function itemAttributes()
    {
        return $this->hasMany(ItemAttribute::class,'item_id');
    }
}
