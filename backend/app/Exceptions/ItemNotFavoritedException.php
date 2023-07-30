<?php

namespace App\Exceptions;

use Exception;

class ItemNotFavoritedException extends Exception
{
    protected $message = 'お気に入りに登録されていません。';
}
