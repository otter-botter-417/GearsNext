<?php

namespace App\Domain\FavoriteLayout;

use App\Models\Layout;
use App\Models\FavoriteLayout;
use App\Exceptions\LayoutNotFavoritedException;
use Illuminate\Database\Eloquent\Collection;
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
     * お気に入りに登録されているレイアウトを取得
     * @param  int  $userId
     * @param  int  $layoutId
     * @return FavoriteLayout
     * @throws LayoutNotFavoritedException
     */
    public function getFavoriteLayout(int $userId, int $layoutId): FavoriteLayout
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
        return $favoriteLayout;
    }

    /**
     * お気に入りのレイアウト一覧を取得し、それぞれのレイアウト情報を結合
     * @param  string $userId
     * @return Collection
     */
    public function getFavoriteLayouts(int $userId): Collection
    {
        return $this->model->where('user_id', $userId)->with('layout')->get();
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
        $favoriteLayout = $this->getFavoriteLayout($userId, $layoutId);
        $favoriteLayout->delete();
    }

    /**
     * ユーザーがお気に入り登録しているか確認
     * @param  int  $userId
     * @param  int  $layoutId
     * @return bool
     */
    public function getUserFavoriteExists(int $userId, int $layoutId): bool
    {
        return $this->model->where('user_id', $userId)->where('layout_id', $layoutId)->exists();
    }
}
