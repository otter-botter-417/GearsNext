<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ブランドに関するモデルクラスです。
 * @package App\Models
 * @property int $brand_id
 * @property string $brand_name
 */
class Brand extends Model
{
    use HasFactory;

    protected $primaryKey = 'brand_id';

    protected $fillable = [
        'brand_name'
    ];

    public $timestamps = false;
}
