<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Exceptions\UserAlreadyRegisteredException;

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
     * ユーザーを登録する
     * @param string $userFirebaseId
     * @param string $name
     * @param string $email
     * @return void
     * @throws UserAlreadyRegisteredException 商品が既に登録されている場合
     * @throws EmailAlreadyUsedException メールアドレスが既に登録されている場合
     */
    public function register(string $userFirebaseId, string $name, string $email): void
    {
        $this->userRepository->ensureUserNotExists($userFirebaseId);

        $this->userRepository->ensureEmailNotExists($email);

        $this->userRepository->createUserData($userFirebaseId, $name, $email);
    }

    /**
     * お気に入りに商品を追加
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する場合にスローされます。
     */
    public function addFavoriteItem(string $userFirebaseId, int $itemId): void
    {
        $this->favoriteItemService->addFavoriteItem($userFirebaseId, $itemId);
    }

    /**
     * お気に入りから商品を削除
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @throws ItemNotFoundException 商品が見つからない場合にスローされます。
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない場合にスローされます。
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
