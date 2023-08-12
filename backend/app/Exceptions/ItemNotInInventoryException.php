<?php

namespace App\Exceptions;

use Exception;

class ItemNotInInventoryException extends Exception
{
    protected $message = '持っている商品に登録されていません。';
}
