<?php

namespace App\Domain\FavoriteLayout;

use App\Models\Layout;
use App\Models\FavoriteLayout;
use App\Exceptions\LayoutNotFavoritedException;
use Illuminate\Support\Facades\Log;

/**
 * お気に入りレイアウトに関するリポジトリクラス
 * @mixin FavoriteLayoutRepositoryInterface
 */
class FavoriteLayoutRepository implements FavoriteLayoutRepositoryInterface
{
    protected $model;

    public function __construct(FavoriteLayout $favoriteLayout)
    {
        $this->model = $favoriteLayout;
    }

    /**
     * お気に入りのレイアウト一覧を取得
     * @param  string $userId
     * @return array
     */
    public function getFavoriteLayouts(int $userId)
    {
        return $this->model->where('user_id', $userId)->pluck('layout_id')->toArray();
    }

    /**
     * お気に入りにレイアウトを追加
     * @param  int   $userId
     * @param  int   $layoutId
     * @return Layout
     */
    public function addFavoriteLayoutData(int $userId, int $layoutId): FavoriteLayout
    {
        return $this->model->firstOrCreate([
                    'user_id' => $userId,
                    'layout_id' => $layoutId,
               ]);
    }

    /**
     * お気に入りからレイアウトを削除
     * @param  int  $userId
     * @param  int  $layoutId
     * @return void
     */
    public function removeFavoriteLayoutData(int $userId, int $layoutId): void
    {
        $favoriteLayout = $this->model->where('user_id', $userId)
            ->where('layout_id', $layoutId)
            ->first();
        if (!$favoriteLayout) {
            Log::error(
                'お気に入りにレイアウトが存在しません',
                [
                    'action' => 'removeFavoriteLayoutData',
                    'userId' => $userId,
                    'itemId' => $layoutId
                ]
            );
            throw new LayoutNotFavoritedException();
        }
        $favoriteLayout->delete();
    }

    /**
     * ユーザーがお気に入り登録しているか確認
     * @param  int  $userId
     * @param  int  $layoutId
     * @return bool
     */
    public function getUserFavoriteExists(int $userId,int $layoutId): bool
    {
        return $this->model->where('user_id', $userId)->where('layout_id', $layoutId)->exists();
    }
}
