<?php

namespace App\Exceptions;

use Exception;

class LayoutNotFoundException extends Exception
{
    protected $message = 'レイアウトが見つかりませんでした。';
}
