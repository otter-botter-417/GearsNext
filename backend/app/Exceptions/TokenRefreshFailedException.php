<?php

namespace App\Exceptions;

use Exception;

class TokenRefreshFailedException extends Exception
{
    protected $message = '認証の更新に失敗しました。再度ログインしてください';
}
