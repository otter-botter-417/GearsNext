<?php

namespace App\Domain\UserInventory;

interface UserInventoryRepositoryInterface
{
    /**
     * 持っている商品一覧を取得
     * @param  int $userId
     * @return array
     */
    public function getUserInventoryItemIds(int $userId): array;

    /**
     * 持っている商品に追加
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     */
    public function addUserInventoryData(int $userId, int $itemId): void;

    /**
     * 持っている商品から削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotInInventoryException 持っている商品に存在しない
     */
    public function removeUserInventoryData(int $userId, int $itemId): void;

    /**
     * ユーザーの持っているものに登録しているか確認
     * @param  int  $userId
     * @param  int  $itemId
     * @return bool
     */
    public function getUserInventoryExists(int $userId,int $itemId): bool;
}
