<?php

namespace App\Exceptions;

use Exception;

class LayoutNotFavoritedException extends Exception
{
    protected $message = 'お気に入りにレイアウトが登録されていません。';
}
