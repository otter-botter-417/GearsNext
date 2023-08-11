<?php

namespace App\Services;

use App\Contracts\FavoriteItemRepositoryInterface;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\UserRepositoryInterface;
use App\Exceptions\FavoriteItemAlreadyRegisteredException;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/**
 * お気に入り商品に関するサービスクラス
 * @package App\Services
 */
class FavoriteItemService
{
    /**
     * @var FavoriteItemRepositoryInterface
     */
    protected $favoriteItemRepository;

    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @var ItemRepositoryInterface
     */
    protected $itemRepository;

    public function __construct(
        FavoriteItemRepositoryInterface $favoriteItemRepository,
        UserRepositoryInterface $userRepository,
        ItemRepositoryInterface $itemRepository

    ) {
        $this->favoriteItemRepository = $favoriteItemRepository;
        $this->userRepository = $userRepository;
        $this->itemRepository = $itemRepository;
    }

    /**
     * お気に入りに追加
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する場合
     */
    public function addFavoriteItem($userFirebaseId, $itemId)
    {
        $userId = $this->userRepository->getUserIdByFirebaseId($userFirebaseId);

        $this->itemRepository->ensureItemExists($itemId);

        $this->favoriteItemRepository->favoriteItemAlreadyExists($userId, $itemId);

        $this->favoriteItemRepository->addFavoriteItemData($userId, $itemId);
    }

    /**
     * お気に入りから削除
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @throws UserNotFoundException ユーザーが見つからない場合
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない場合
     */
    public function removeFavoriteItem($userFirebaseId, $itemId)
    {
        $userId = $this->userRepository->getUserIdByFirebaseId($userFirebaseId);

        $this->itemRepository->ensureItemExists($itemId);

        $this->favoriteItemRepository->removeFavoriteItemData($userId, $itemId);
    }

    /**
     * ユーザーのお気に入り商品を取得
     * @param  string $userFirebaseId
     * @throws UserNotFoundException ユーザーが見つからない場合にスローされます。
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFavoriteItems($userFirebaseId)
    {
        $userId = $this->userRepository->getUserIdByFirebaseId($userFirebaseId);
        $favoriteItems = $this->favoriteItemRepository->getFavoriteItems($userId);

        return $favoriteItems;
    }
}
