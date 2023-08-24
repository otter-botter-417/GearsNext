<?php

namespace App\Services;

use App\Models\User;
use App\Contracts\UserRepositoryInterface;
use App\Exceptions\EmailAlreadyUsedException;
use App\Exceptions\LoginFailedException;
use App\Exceptions\UserNameAlreadyRegisteredException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * ユーザーに関するサービスクラス
 * @package App\Services
 */
class UserService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
    ) {
        $this->userRepository = $userRepository;
    }

    /**
     * ユーザーを登録する
     * @param string $user_name
     * @param string $email
     * @param string $password
     * @return User
     */
    public function register(string $user_name, string $email, string $password): User
    {
        $hashedPassword = $this->hashPassword($password);
        $user = $this->userRepository->createUserData($user_name, $email, $hashedPassword);

        return $user;
    }

    /**
     * パスワードをハッシュ化する
     * @param string $password
     * @return string
     */
    private function hashPassword(string $password): string
    {
        return bcrypt($password);
    }

    /**
     * JWTトークンを発行する
     * @param User $user
     * @return string
     */
    public function createToken(User $user): string
    {
        return JWTAuth::fromUser($user);
    }

    /**
     * ユーザーをログインさせる
     * @param string $email
     * @param string $password
     * @return User
     * @throws LoginFailedException 認証情報が無効
     */
    public function login(string $email, string $password): User
    {
        $credentials = [
            'email' => $email,
            'password' => $password,
        ];
        // 認証に失敗
        if (!Auth::attempt($credentials)) {
            throw new LoginFailedException();
        }
        $user = Auth::user();

        return $user;
    }

    /**
     * ユーザー情報を変更する
     * @param int $userId
     * @param array $data  [user_name, email, password]
     * @return void
     */
    public function updateUserData(int $userId, array $data): void
    {
        $data['password'] = $this->hashPassword($data['password']);
        $this->userRepository->updateUserData($userId, $data);
    }

    /**
     * ユーザーを削除する
     * @param int $userId
     * @return void
     */
    public function deleteUserData(int $userId): void
    {
        $this->userRepository->deleteUserData($userId);
    }
}
