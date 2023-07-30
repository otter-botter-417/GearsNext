<?php

namespace App\Exceptions;

use Exception;

class ItemTagNotFoundException extends Exception
{
    protected $message = 'アイテムタグが見つかりませんでした。';
}
