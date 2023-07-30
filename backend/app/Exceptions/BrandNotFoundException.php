<?php

namespace App\Exceptions;

use Exception;

class BrandNotFoundException extends Exception
{
    protected $message = 'ブランドが見つかりませんでした。';
}
