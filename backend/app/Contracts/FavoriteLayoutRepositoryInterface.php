<?php

namespace App\Contracts;

use App\Models\Layout;

interface FavoriteLayoutRepositoryInterface
{
    /**
     * 既にお気に入りにレイアウトが追加されているか確認
     * @param int $userId
     * @param int $layoutId
     * @return void
     */
    public function favoriteLayoutAlreadyExists(int $userId, int $layoutId): void;

    /**
     * お気に入りにレイアウトを追加
     * @param  int $userId
     * @param  int $layoutId
     */
    public function addFavoriteLayoutData(int $userId, int $layoutId): void;

    /**
     * お気に入りからレイアウトを削除
     * @param  int $userId
     * @param  int $layoutId
     * @return void
     */
    public function removeFavoriteLayoutData(int $userId, Layout $layout): void;

    /**
     * お気に入りのレイアウト一覧を取得
     * @param  int $userId
     * @return array
     */
    public function getFavoriteLayouts(int $userId);
}
