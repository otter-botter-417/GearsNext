<?php

namespace App\Exceptions;

use Exception;

class ItemAlreadyInInventoryException extends Exception
{
    protected $message = '持っている物に登録されています';
}
