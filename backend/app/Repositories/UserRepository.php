<?php

namespace App\Repositories;

use App\Models\User;
use App\Contracts\UserRepositoryInterface;

/**
 * ユーザーに関するリポジトリクラス
 * @mixin UserRepositoryInterface
 */
class UserRepository implements UserRepositoryInterface
{
    protected $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * ユーザーを登録する
     * @param string $userName
     * @param string $email
     * @param string $password
     * @return User
     */
    public function createUserData(string $userName, string $email, string $password): User
    {
        $user = $this->model->create([
            'user_name' => $userName,
            'email' => $email,
            'password' => $password
        ]);
        return $user;
    }

    /**
     * ユーザー情報を更新する
     * @param int $userId
     * @param array $data
     * @return void
     */
    public function updateUserData($userId, $data)
    {
        $user = $this->model->find($userId);
        $user->fill($data);
        $user->save();
    }

    /**
     * ユーザーを削除する
     * @param int $userId
     * @return void
     */
    public function deleteUserData($userId)
    {
        $user = $this->model->find($userId);
        $user->delete();
    }
}
