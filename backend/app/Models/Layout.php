<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    use HasFactory;

    protected $primaryKey = 'layout_id';

    protected $fillable = [
        'text',
        'user_id',
    ];

    protected $hidden = ['image_map_id'];

    public function imageMap()
    {
        return $this->hasMany(ImageMap::class, 'image_map_id');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'item_layout', 'layout_id', 'item_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
