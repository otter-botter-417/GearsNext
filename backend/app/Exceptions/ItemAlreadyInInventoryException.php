<?php

namespace App\Exceptions;

use Exception;

class ItemAlreadyInInventoryException extends Exception
{
    protected $message = '既に持っている商品に登録されています。';
}
