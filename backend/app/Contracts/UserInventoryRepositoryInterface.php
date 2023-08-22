<?php

namespace App\Contracts;

interface UserInventoryRepositoryInterface
{
    /**
     * 持っている商品に追加
     * @param  int  $userId
     * @param  int  $itemId
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する場合
     */
    public function addUserInventoryData(int $userId, int $itemId): void;

    /**
     * 持っている商品から削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotFavoritedException お気に入りに商品が存在しない場合
     */
    public function removeUserInventoryData(int $userId, int $itemId): void;

    /**
     * 持っている商品一覧を取得
     * @param  int $userId
     * @return array
     */
    public function getUserInventoryItemIds(int $userId): array;
}
