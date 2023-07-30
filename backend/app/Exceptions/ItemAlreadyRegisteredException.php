<?php

namespace App\Exceptions;

use Exception;

class ItemAlreadyRegisteredException extends Exception
{
    protected $message = '商品は既に登録されています。';
}
