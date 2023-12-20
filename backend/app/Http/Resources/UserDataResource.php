<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ユーザーの情報を提供するリソースクラスです。
 * このクラスではユーザーの情報をJSON形式で返却します。
 * 
 * UserControllerのgetAuthenticatedUserメソッドで使用します。
 */
class UserDataResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'userId' => $this->user->user_id,
            'userName' => $this->user->user_name,
        ];
    }
}
