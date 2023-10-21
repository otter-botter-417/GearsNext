<?php

namespace App\Domain\UserInventory;

use App\Models\UserInventory;
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
     * @param  int $userId
     * @return array
     */
    public function getUserInventoryItemIds(int $userId): array
    {
        return $this->model->where('user_id', $userId)->pluck('item_id')->toArray();
    }

    /**
     * 持っている商品に追加
     * ユーザーIDとアイテムIDが一致するレコードが存在する場合はそのレコードを返し、
     * 存在しない場合は新しいレコードを作成します。
     * @param  int  $userId
     * @param  int  $itemId
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
     * @param  int  $userId
     * @param  int  $itemId
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

    /**
     * ユーザーの持っているものに登録しているか確認
     * @param  int  $userId
     * @param  int  $itemId
     * @return bool
     */
    public function getUserInventoryExists(int $userId,int $itemId): bool
    {
        return $this->model->where('user_id', $userId)->where('item_id', $itemId)->exists();
    }
}
