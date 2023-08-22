<?php

namespace App\Repositories;

use App\Models\UserInventory;
use App\Contracts\UserInventoryRepositoryInterface;
use App\Exceptions\ItemNotInInventoryException;
use Illuminate\Support\Facades\Log;

/**
 * ユーザーの持っている商品に関するリポジトリクラス
 * @mixin UserInventoryRepositoryInterface
 */
class UserInventoryRepository implements UserInventoryRepositoryInterface
{
    protected $model;

    public function __construct(UserInventory $userInventory)
    {
        $this->model = $userInventory;
    }

    /**
     * 持っている商品一覧を取得
     * @param  string $userId
     * @return array
     */
    public function getUserInventoryItemIds(int $userId): array
    {
        return $this->model->where('user_id', $userId)->pluck('item_id')->toArray();
    }

    /**
     * 持っている商品に追加
     * @param  int    $userId
     * @param  int    $itemId
     * @return void
     */
    public function addUserInventoryData(int $userId, int $itemId): void
    {
        $this->model->firstOrCreate([
            'user_id' => $userId,
            'item_id' => $itemId,
        ]);
    }


    /**
     * 持っている商品から削除
     * @param  string $userId
     * @param  int    $itemId
     * @return void
     * @throws ItemNotInInventoryException 持っている商品に存在しない場合
     */
    public function removeUserInventoryData(int $userId, int $itemId): void
    {
        $userInventory = $this->model->where('user_id', $userId)
            ->where('item_id', $itemId)
            ->first();
        if (!$userInventory) {
            Log::error(
                '持っている商品に存在しません',
                [
                    'action' => 'removeUserInventoryData',
                    'userId' => $userId,
                    'itemId' => $itemId
                ]
            );
            throw new ItemNotInInventoryException();
        }
        $userInventory->delete();
    }
}
