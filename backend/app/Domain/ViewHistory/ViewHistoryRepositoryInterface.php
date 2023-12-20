<?php

namespace App\Domain\ViewHistory;

interface ViewHistoryRepositoryInterface
{
    /**
     * 商品の閲覧履歴に追加 ユニークなので過去に追加されていれば日時を更新
     * @param int $userId
     * @param int $itemId
     * @return void
     */
    public function saveViewItemHistory(int $userId, int $itemId): void;

    /**
     * レイアウトの閲覧履歴に追加 ユニークなので過去に追加されていれば日時を更新
     * すでに保存されていれば更新時間だけを更新
     * @param  int  $layoutId
     * @param  int $userId
     * @return void
     */
    public function saveViewLayoutHistory(int $layoutId, int $userId): void;
}
