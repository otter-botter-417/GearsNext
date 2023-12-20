<?php

namespace App\Exceptions;

use Exception;

class TokenExpiredException extends Exception
{
    protected $message = '認証期限が切れました。再度ログインしてください';
}
