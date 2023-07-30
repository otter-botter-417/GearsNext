<?php

namespace App\Exceptions;

use Exception;

class ItemAlreadyFavoritedException extends Exception
{
    protected $message = 'お気に入りに登録されています';
}
