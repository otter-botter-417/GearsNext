<?php

namespace App\Exceptions;

use Exception;

class CategoryNotFoundException extends Exception
{
    protected $message = 'カテゴリーが見つかりませんでした。';
}
