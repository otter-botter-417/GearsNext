<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FavoriteLayout extends Model
{
    use HasFactory;
    protected $primaryKey = 'favorite_layouts_id';

    protected $fillable = [
        'user_id',
        'layout_id',
    ];

    public function layout()
    {
        return $this->belongsTo(Layout::class, 'layout_id');
    }
}
