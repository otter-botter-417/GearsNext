<?php

namespace App\Exceptions;

use Exception;

class UserAlreadyRegisteredException extends Exception
{
    protected $message = 'ユーザーは既に登録されています。';
}
