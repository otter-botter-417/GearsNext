<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\FavoriteItemRepositoryInterface;


/**
 * お気に入り商品に関するサービスクラス
 * @package App\Services
 */
class FavoriteItemService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @var ItemRepositoryInterface
     */
    protected $itemRepository;

    /**
     * @var FavoriteItemRepositoryInterface
     */
    protected $favoriteItemRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
        ItemRepositoryInterface $itemRepository,
        FavoriteItemRepositoryInterface $favoriteItemRepository
    ) {
        $this->userRepository = $userRepository;
        $this->itemRepository = $itemRepository;
        $this->favoriteItemRepository = $favoriteItemRepository;
    }

    /**
     * ユーザーのお気に入り商品を取得
     * @param  int  $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFavoriteItems(int $userId): \Illuminate\Database\Eloquent\Collection
    {
        $favoriteItemIds = $this->favoriteItemRepository->getFavoriteItems($userId);
        $userInventories = $this->itemRepository->getItemsByIds($favoriteItemIds);
        return $userInventories;
    }

    /**
     * お気に入りに追加
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する
     */
    public function addFavoriteItem(int $userId, int $itemId): void
    {
        $this->itemRepository->ensureItemExists($itemId);
        $this->favoriteItemRepository->favoriteItemAlreadyExists($userId, $itemId);
        $this->favoriteItemRepository->addFavoriteItemData($userId, $itemId);
    }

    /**
     * お気に入りから削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない
     */
    public function removeFavoriteItem(int $userId, int $itemId): void
    {
        $this->itemRepository->ensureItemExists($itemId);
        $this->favoriteItemRepository->removeFavoriteItemData($userId, $itemId);
    }
}
