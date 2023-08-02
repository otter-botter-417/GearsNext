<?php

namespace App\Models;

use App\Exceptions\SubCategoryNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SubCategory extends Model
{
    use HasFactory;

    protected $primaryKey = 'sub_category_id';
    public $timestamps = false;

    protected $fillable = [
        'sub_category_name'
    ];
}
