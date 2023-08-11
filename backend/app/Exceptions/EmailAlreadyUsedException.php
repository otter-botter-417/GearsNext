<?php

namespace App\Exceptions;

use Exception;

class EmailAlreadyUsedException extends Exception
{
    protected $message = 'メールアドレスは既に登録されています。';
}
