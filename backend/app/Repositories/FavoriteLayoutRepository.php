<?php

namespace App\Repositories;

use App\Contracts\FavoriteLayoutRepositoryInterface;
use App\Exceptions\LayoutAlreadyFavoritedException;
use App\Exceptions\LayoutNotFavoritedException;
use App\Models\FavoriteLayout;
use App\Models\Layout;
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
     * 既にお気に入りにレイアウトが追加されているか確認
     * @param int $userId
     * @param int $layoutId
     * @return void
     * @throws LayoutAlreadyFavoritedException お気に入りにレイアウトが存在する場合
     */
    public function favoriteLayoutAlreadyExists(int $userId, int $layoutId): void
    {
        $favoriteLayout =  $this->model->where('user_id', $userId)
            ->where('layout_id', $layoutId)
            ->exists();
        if ($favoriteLayout) {
            Log::error(
                'レイアウトが既にお気に入りに登録されています',
                [
                    'action' => 'favoriteLayoutAlreadyExists',
                    'userId' => $userId,
                    'layoutId' => $layoutId
                ]
            );
            // throw new LayoutAlreadyFavoritedException();
        }
    }

    /**
     * お気に入りにレイアウトを追加
     * @param  int    $userId
     * @param  int    $layoutId
     * @return void
     */
    public function addFavoriteLayoutData(int $userId, int $layoutId): void
    {
        $this->model->create([
            'user_id' => $userId,
            'layout_id' => $layoutId,
        ]);
    }

    /**
     * お気に入りからレイアウトを削除
     * @param  int $userId
     * @param  Layout $layout
     * @return void
     */
    public function removeFavoriteLayoutData(int $userId, Layout $layout): void
    {
        $this->model->where('user_id', $userId)
            ->where('layout_id', $layout->id)
            ->delete();
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
}
