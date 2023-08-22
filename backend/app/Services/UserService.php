<?php

namespace App\Services;

use App\Models\User;
use App\Contracts\UserRepositoryInterface;
use App\Exceptions\LoginFailedException;
use App\Exceptions\UserAlreadyRegisteredException;
use Illuminate\Support\Facades\Auth;
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

    private $favoriteItemService;

    public function __construct(
        UserRepositoryInterface $userRepository,
        FavoriteItemService $favoriteItemService

    ) {
        $this->userRepository = $userRepository;
        $this->favoriteItemService = $favoriteItemService;
    }

    /**
     * ユーザーを登録する
     * @param string $userName
     * @param string $email
     * @param string $password
     * @return User
     * @throws UserAlreadyRegisteredException 商品が既に登録されている
     * @throws EmailAlreadyUsedException メールアドレスが既に登録されている
     */
    public function register(string $userName, string $email, string $password): User
    {
        $this->userRepository->ensureEmailNotExists($email);

        $password = $this->hashPassword($password);

        $user = $this->userRepository->createUserData($userName, $email, $password);

        return $user;
    }

    /**
     * パスワードをハッシュ化する
     * @param string $password
     * @return string
     */
    public function hashPassword(string $password): string
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
     * @param array $data  [userName, email, password]
     * @return void
     */
    public function updateUserData(int $userId, array $data): void
    {
        $password = $this->hashPassword($data['password']);

        $data = [
            'user_name' => $data['userName'],
            'email' => $data['email'],
            'password' => $password,
        ];
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
