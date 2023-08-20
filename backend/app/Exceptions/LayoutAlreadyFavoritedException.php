<?php

namespace App\Exceptions;

use Exception;

class LayoutAlreadyFavoritedException extends Exception
{
    protected $message = 'レイアウトが既にお気に入りに登録されています。';
}
