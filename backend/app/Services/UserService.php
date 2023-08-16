<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Exceptions\LoginFailedException;
use App\Exceptions\UserAlreadyRegisteredException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * 商品に関するサービスクラス
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
     * JWTトークンを発行する
     * @param User $user
     * @return string
     */
    public function createToken(User $user): string
    {
        return JWTAuth::fromUser($user);
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
     * ユーザーを登録する
     * @param string $name
     * @param string $email
     * @param string $password
     * @return User
     * @throws UserAlreadyRegisteredException 商品が既に登録されている
     * @throws EmailAlreadyUsedException メールアドレスが既に登録されている
     */
    public function register(string $name, string $email, string $password): User
    {
        $this->userRepository->ensureEmailNotExists($email);

        $password = $this->hashPassword($password);

        $user = $this->userRepository->createUserData($name, $email, $password);

        return $user;
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
     * @param array $data
     * @return void
     */
    public function updateUserData(int $userId, array $data): void
    {
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

    /**
     * お気に入りに商品を追加
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない
     * @throws ItemNotFoundException 商品が見つからない
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する
     */
    public function addFavoriteItem(string $userFirebaseId, int $itemId): void
    {
        $this->favoriteItemService->addFavoriteItem($userFirebaseId, $itemId);
    }

    /**
     * お気に入りから商品を削除
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない
     * @throws ItemNotFoundException 商品が見つからない
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない
     */
    public function removeFavoriteItem(string $userFirebaseId, int $itemId): void
    {
        $this->favoriteItemService->removeFavoriteItem($userFirebaseId, $itemId);
    }

    /**
     * お気に入り一覧を取得
     * @param  string $userFirebaseId
     * @return array
     */
    public function getFavoriteItems(string $userFirebaseId): array
    {
        return $this->favoriteItemService->getFavoriteItems($userFirebaseId)->toArray();
    }
}
