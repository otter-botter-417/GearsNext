<?php

namespace App\Domain\ViewItemHistory;

use App\Models\ViewItemHistory;

/**
 * 商品の閲覧履歴に関するリポジトリクラス
 * @mixin ViewItemHistoryRepositoryInterface
 */
class ViewItemHistoryRepository implements ViewItemHistoryRepositoryInterface
{
    protected $model;

    public function __construct(ViewItemHistory $viewItemHistory)
    {
        $this->model = $viewItemHistory;
    }

    /**
     * 商品の閲覧履歴に追加 ユニークなので過去に追加されていれば日時を更新
     * @param int $userId
     * @param int $itemId
     * @return void
     */
    public function saveViewItemHistory(int $userId, int $itemId): void
    {
        $this->model->updateOrInsert(
            ['user_id' => $userId, 'item_id' => $itemId],
            ['updated_at' => now()]
        );
    }
}
