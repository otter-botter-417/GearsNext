<?php

namespace App\Exceptions;

use Exception;

class UserNameAlreadyRegisteredException extends Exception
{
    protected $message = 'ユーザー名は既に使われています。';
}
