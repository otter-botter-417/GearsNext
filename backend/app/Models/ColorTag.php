<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorTag extends Model
{
    use HasFactory;

    protected $primaryKey = 'color_tag_id';
    public $timestamps = false;

    protected $fillable = [
        'color_name'];


}