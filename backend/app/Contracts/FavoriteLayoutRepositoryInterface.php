<?php

namespace App\Contracts;

use App\Models\FavoriteLayout;

interface FavoriteLayoutRepositoryInterface
{
    /**
     * お気に入りのレイアウト一覧を取得
     * @param  int $userId
     * @return array
     */
    public function getFavoriteLayouts(int $userId);
    /**
     * お気に入りにレイアウトを追加
     * @param  int $userId
     * @param  int $layoutId
     * @return FavoriteLayout
     */
    public function addFavoriteLayoutData(int $userId, int $layoutId): FavoriteLayout;

    /**
     * お気に入りからレイアウトを削除
     * @param  int $userId
     * @param  int $layoutId
     * @return void
     */
    public function removeFavoriteLayoutData(int $userId, int $layoutId): void;

        /**
     * ユーザーがお気に入り登録しているか確認
     * @param  int  $userId
     * @param  int  $layoutId
     * @return bool
     */
    public function getUserFavoriteExists(int $userId,int $layoutId): bool;
}
