<?php

namespace App\Domain\User;

use App\Models\User;

interface UserRepositoryInterface
{
    /**
     * ユーザーを登録する
     * @param  array  $registerRequest [user_name, email, password]
     * @return User
     */
    public function createUserData(array $registerData): User;

    /**
     * ユーザー情報を更新する
     * @param int   $userId
     * @param array $data
     * @return void
     */
    public function updateUserData(int $userId, array $data): void;

    /**
     * ユーザーを削除する
     * @param int $userId
     * @return void
     */
    public function deleteUserData(int $userId): void;
}
