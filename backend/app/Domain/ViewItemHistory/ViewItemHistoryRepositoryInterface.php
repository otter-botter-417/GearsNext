<?php

namespace App\Domain\ViewItemHistory;

interface ViewItemHistoryRepositoryInterface
{
    /**
     * 商品の閲覧履歴に追加 ユニークなので過去に追加されていれば日時を更新
     * @param int $userId
     * @param int $itemId
     * @return void
     */
    public function saveViewItemHistory(int $userId, int $itemId): void;
}
