<?php

namespace App\Domain\FavoriteItem;

use App\Models\FavoriteItem;
use App\Exceptions\ItemNotFavoritedException;
use Illuminate\Support\Facades\Log;

/**
 * ユーザーのお気に入り商品に関するリポジトリクラス
 * @mixin FavoriteItemRepositoryInterface
 */
class FavoriteItemRepository implements FavoriteItemRepositoryInterface
{
    protected $model;

    public function __construct(FavoriteItem $favoriteItem)
    {
        $this->model = $favoriteItem;
    }

    /**
     * お気に入りの商品一覧を取得
     * @param  int  $userId
     * @return array
     */
    public function getFavoriteItems(int $userId): array
    {
        return $this->model->where('user_id', $userId)->pluck('item_id')->toArray();
    }

    /**
     * お気に入りに商品を追加
     * @param  int    $userId
     * @param  int    $itemId
     * @return FavoriteItem
     */
    public function addFavoriteItemData(int $userId, int $itemId): FavoriteItem
    {
        return $this->model->firstOrCreate([
                    'user_id' => $userId,
                    'item_id' => $itemId,
                ]);
    }

    /**
     * お気に入りから商品を削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない場合
     */
    public function removeFavoriteItemData(int $userId, int $itemId): void
    {
        $favoriteItem = $this->model->where('user_id', $userId)
            ->where('item_id', $itemId)
            ->first();
        if (!$favoriteItem) {
            Log::error(
                'お気に入りに商品が存在しません',
                [
                    'action' => 'removeFavoriteItemData',
                    'userId' => $userId,
                    'itemId' => $itemId
                ]
            );
            throw new ItemNotFavoritedException();
        }
        $favoriteItem->delete();
    }

    /**
     * ユーザーがお気に入り登録しているか確認
     * @param  int  $userId
     * @param  int  $itemId
     * @return bool
     */
    public function getUserFavoriteExists(int $userId,int $itemId): bool
    {
        return $this->model->where('user_id', $userId)->where('item_id', $itemId)->exists();
    }
}
