<?php

namespace App\Contracts;

use App\Models\User;

interface UserRepositoryInterface
{
    /**
     * ユーザーを登録する
     * @param string $userName
     * @param string $email
     * @param string $password
     * @return User
     */
    public function createUserData(string $userName, string $email, string $password): User;

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
