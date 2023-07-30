<?php

namespace App\Exceptions;

use Exception;

class SubCategoryNotFoundException extends Exception
{
    protected $message = 'サブカテゴリーが見つかりませんでした。';
}
