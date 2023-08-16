<?php

namespace App\Repositories;

use App\Contracts\UserRepositoryInterface;
use App\Exceptions\EmailAlreadyUsedException;
use App\Exceptions\UserAlreadyRegisteredException;
use App\Exceptions\UserNotFoundException;
use App\Models\User;
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
     * @param string $name
     * @param string $email
     * @param string $password
     * @return User
     */
    public function createUserData(string $name, string $email, string $password): User
    {

        $user = $this->model->create([
            'name' => $name,
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


    /**
     * firebaseIdからユーザーIDを取得する
     * @param  string $userFirebaseId
     * @return int user_id
     * @throws UserNotFoundException ユーザーが見つからない場合
     */
    public function getUserIdByFirebaseId($userFirebaseId)
    {
        $user = $this->model->where('user_firebase_id', $userFirebaseId)->first();
        if (!$user) {
            Log::error(
                'firebaseIdからユーザーIDを取得中にエラーが発生',
                [
                    'action' => 'getUserIdByFirebaseId',
                    'userFirebaseId' => $userFirebaseId
                ]
            );
            throw new UserNotFoundException();
        }
        return $user->user_id;
    }
}
