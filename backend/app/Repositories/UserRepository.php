<?php

namespace App\Repositories;

use App\Models\User;
use App\Contracts\UserRepositoryInterface;
use App\Exceptions\EmailAlreadyUsedException;
use App\Exceptions\UserAlreadyRegisteredException;
use Illuminate\Support\Facades\Log;

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
     * ユーザーが既に登録されているか確認する
     * @param string $userFirebaseId
     * @return void
     * @throws UserAlreadyRegisteredException ユーザーが既に登録されている場合
     */
    public function ensureUserNotExists(string $userFirebaseId): void
    {
        $user = $this->model->where('user_firebase_id', $userFirebaseId)->first();
        if ($user) {
            Log::error(
                'ユーザーが既に登録されています',
                [
                    'action' => 'ensureUserNotExists',
                    ['userFirebaseId' => $userFirebaseId]
                ]
            );
            throw new UserAlreadyRegisteredException();
        }
    }

    /**
     * メールアドレスが既に登録されているか確認する
     * @param string $email
     * @return void
     * @throws EmailAlreadyUsedException メールアドレスが既に登録されている場合
     */
    public function ensureEmailNotExists(string $email): void
    {
        $user = $this->model->where('email', $email)->first();
        if ($user) {
            Log::error(
                'メールアドレスが既に登録されています',
                [
                    'action' => 'ensureEmailNotExists',
                    ['email' => $email]
                ]
            );
            throw new EmailAlreadyUsedException();
        }
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
