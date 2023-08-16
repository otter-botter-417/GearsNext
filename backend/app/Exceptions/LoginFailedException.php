<?php

namespace App\Exceptions;

use Exception;

class LoginFailedException extends Exception
{
    protected $message = 'emailまたはパスワードが間違っています。';
}
