<?php

namespace App\Domain\ViewHistory;

use App\Models\ViewItemHistory;
use App\Models\ViewLayoutHistory;

/**
 * 閲覧履歴に関するリポジトリクラス
 * @mixin ViewHistoryRepositoryInterface
 */
class ViewHistoryRepository implements ViewHistoryRepositoryInterface
{
    protected $viewItemHistoryModel;
    protected $viewLayoutHistoryModel;

    public function __construct(
        ViewItemHistory $viewItemHistory,
        ViewLayoutHistory $viewLayoutHistory
    ) {
        $this->viewItemHistoryModel = $viewItemHistory;
        $this->viewLayoutHistoryModel = $viewLayoutHistory;
    }

    /**
     * 商品の閲覧履歴に追加 ユニークなので過去に追加されていれば日時を更新
     * @param int $userId
     * @param int $itemId
     * @return void
     */
    public function saveViewItemHistory(int $userId, int $itemId): void
    {
        $this->viewItemHistoryModel->updateOrInsert(
            ['user_id' => $userId, 'item_id' => $itemId],
            ['updated_at' => now()]
        );
    }

    /**
     * レイアウトの閲覧履歴に追加 ユニークなので過去に追加されていれば日時を更新
     * すでに保存されていれば更新時間だけを更新
     * @param  int  $layoutId
     * @param  int $userId
     * @return void
     */
    public function saveViewLayoutHistory(int $layoutId, int $userId): void
    {
        $this->viewLayoutHistoryModel::updateOrInsert(
            ['user_id' => $userId, 'layout_id' => $layoutId],
            ['updated_at' => now()]
        );
    }
}
