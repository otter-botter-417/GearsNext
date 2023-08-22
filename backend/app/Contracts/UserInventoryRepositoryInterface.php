<?php

namespace App\Contracts;

interface UserInventoryRepositoryInterface
{
    /**
     * 持っている商品に追加
     * @param  int  $userId
     * @param  int  $itemId
     */
    public function addUserInventoryData(int $userId, int $itemId): void;

    /**
     * 持っている商品から削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotFavoritedException 持っている商品に存在しない
     */
    public function removeUserInventoryData(int $userId, int $itemId): void;

    /**
     * 持っている商品一覧を取得
     * @param  int $userId
     * @return array
     */
    public function getUserInventoryItemIds(int $userId): array;
}
