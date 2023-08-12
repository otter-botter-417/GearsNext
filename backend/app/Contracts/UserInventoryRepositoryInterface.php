<?php

namespace App\Contracts;

interface UserInventoryRepositoryInterface
{
    /**
     * 既に持っている商品に追加されているか確認
     * @param int $userId
     * @param int $itemId
     * @return void
     */
    public function userInventoryAlreadyExists(int $userId, int $itemId): void;

    /**
     * 持っている商品に追加
     * @param  string $userId
     * @param  int    $itemId
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemAlreadyFavoritedException お気に入りに商品が存在する場合
     */
    public function addUserInventoryData(int $userId, int $itemId): void;

    /**
     * 持っている商品から削除
     * @param  string $userId
     * @param  int    $itemId
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
