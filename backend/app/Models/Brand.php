<?php

namespace App\Models;

use App\Exceptions\BrandNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Brand extends Model
{
    use HasFactory;
    protected $primaryKey = 'brand_id';

    protected $fillable = [
        'brand_name'
    ];
    public $timestamps = false;
}
