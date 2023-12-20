<?php

namespace App\Domain\User;

use App\Exceptions\LoginFailedException;
use Illuminate\Support\Facades\Auth;

/**
 * ユーザーに関するサービスクラス
 * @package App\Services
 */
class UserService
{
    /**
     * @var UserAuthService
     */
    protected $userAuthService;

    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;


    public function __construct(
        UserAuthService $userAuthService,
        UserRepositoryInterface $userRepository
    ) {
        $this->userAuthService = $userAuthService;
        $this->userRepository = $userRepository;
    }

    /**
     * ユーザーを登録する
     * @param  array  $registerRequest [user_name, email, password]
     * @return array JWTトークン 
     */
    public function userRegister(array $registerData): array
    {
        $registerData['password'] = $this->hashPassword($registerData['password']);
        $user = $this->userRepository->createUserData($registerData);
        return $this->userAuthService->createToken($user);
    }

    /**
     * パスワードをハッシュ化する
     * @param  string $password
     * @return string
     */
    private function hashPassword(string $password): string
    {
        return bcrypt($password);
    }

    /**
     * ユーザーをログインさせる
     * @param  array  $loginRequest
     * @return array JWTトークン
     * @throws LoginFailedException 認証情報が無効
     */
    public function userLogin(array $loginRequest): array
    {
        // 認証に失敗
        if (!Auth::attempt($loginRequest)) {
            throw new LoginFailedException();
        }
        return $this->userAuthService->createToken(Auth::user());
    }

    /**
     * ユーザー情報を変更する
     * @param  array $data  [user_name, email, password]
     * @return void
     */
    public function updateUserData(array $data): void
    {
        if (isset($data['password'])) {
            $data['password'] = $this->hashPassword($data['password']);
        }
        $this->userRepository->updateUserData(Auth::id(), $data);
    }

    /**
     * ユーザーを削除する
     * - ユーザー情報を削除
     * - トークンを無効化
     * @return void
     */
    public function deleteUserAndInvalidateToken(): void
    {
        $this->deleteUserData(Auth::id());
        $this->userAuthService->tokenInvalidate();
    }

    /**
     * ユーザー情報を削除
     * @param  int $userId
     * @return void
     */
    public function deleteUserData(int $userId): void
    {
        $this->userRepository->deleteUserData($userId);
    }
}
