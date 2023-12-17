<?php

namespace App\Domain\FavoriteItem;

use App\Domain\User\UserRepositoryInterface;
use App\Domain\Item\ItemRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

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
     * ユーザーのお気に入り商品を取得し、それぞれにItemの情報を結合して返す
     * @param  int  $userId
     * @return Collection
     */
    public function getFavoriteItems(int $userId): Collection
    {
        // ユーザーのお気に入り商品を取得し、それぞれに関連するItemの情報を即座にロードする
        return $this->favoriteItemRepository->getFavoriteItemsWithItem($userId);
    }

    /**
     * お気に入りに追加
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     */
    public function addFavoriteItem(int $userId, int $itemId): void
    {
        $item = $this->favoriteItemRepository->addFavoriteItemData($userId, $itemId);
        if ($item->wasRecentlyCreated) {
            $this->itemRepository->incrementitemFavoriteCount($itemId);
        }
    }

    /**
     * お気に入りから削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない
     */
    public function removeFavoriteItem(int $userId, int $itemId): void
    {
        $this->favoriteItemRepository->removeFavoriteItemData($userId, $itemId);
        $this->itemRepository->decrementitemFavoriteCount($itemId);

    }
}
