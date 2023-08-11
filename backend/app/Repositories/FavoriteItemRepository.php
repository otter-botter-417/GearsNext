<?php

namespace App\Repositories;

use App\Contracts\FavoriteItemRepositoryInterface;
use App\Exceptions\ItemAlreadyFavoritedException;
use App\Exceptions\ItemNotFavoritedException;
use App\Models\FavoriteItem;
use Illuminate\Support\Facades\Log;

/**
 * お気に入り商品に関するリポジトリクラス
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
     * 既にお気に入りに商品が追加されているか確認
     * @param int $userId
     * @param int $itemId
     * @return void
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する場合
     */
    public function favoriteItemAlreadyExists(int $userId, int $itemId): void
    {
        $favoriteItem =  $this->model->where('user_id', $userId)
            ->where('item_id', $itemId)
            ->exists();
        if ($favoriteItem) {
            Log::error(
                '商品が既にお気に入りに登録されています',
                [
                    'action' => 'favoriteItemAlreadyExists',
                    'userId' => $userId,
                    'itemId' => $itemId
                ]
            );
            throw new ItemAlreadyFavoritedException();
        }
    }

    /**
     * お気に入りに商品を追加
     * @param  int    $userId
     * @param  int    $itemId
     * @return void
     */
    public function addFavoriteItemData(int $userId, int $itemId): void
    {
        $this->model->create([
            'user_id' => $userId,
            'item_id' => $itemId,
        ]);
    }

    /**
     * お気に入りから商品を削除
     * @param  string $userId
     * @param  int    $itemId
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
     * お気に入りの商品一覧を取得
     * @param  string $userId
     * @return array
     */
    public function getFavoriteItems(int $userId): array
    {
        return $this->model->where('user_id', $userId)->pluck('item_id')->toArray();
    }
}
