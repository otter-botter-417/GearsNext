<?php

namespace App\Domain\Layout;

use App\Models\Layout;
use App\Models\TagPosition;
use App\Exceptions\LayoutNotFoundException;
use Illuminate\Database\Eloquent\Collection;

/**
 * レイアウトに関するリポジトリクラス
 * @mixin LayoutRepositoryInterface
 */
class LayoutRepository implements LayoutRepositoryInterface
{
    protected $layoutModel;
    protected $tagPositionModel;

    public function __construct(Layout $layout, TagPosition $tagPosition)
    {
        $this->layoutModel = $layout;
        $this->tagPositionModel = $tagPosition;
    }

    /**
     * ユーザーが登録したレイアウトを取得する
     * @param  int $userId
     * @return Collection
     */
    public function getUserLayouts(int $userId): Collection
    {
        return $this->layoutModel->where('user_id', $userId)->with(['items', 'users'])->get();
    }

    /**
     * 全てのレイアウトを取得する
     * @return Collection
     */
    public function getAllLayouts(): Collection
    {
        return $this->layoutModel->with(['items', 'users'])->get();
    }

    /**
     * レイアウトの詳細を取得する
     * @param  Layout $layout
     * @return Layout リレーション先のデータも含めて返す
     * @throws LayoutNotFoundException
     */
    public function getLayoutWithRelations(Layout $layout): Layout
    {
        return $this->layoutModel::where('layout_id', $layout->layout_id)
            ->with([
                'items',
                'users',
                'comments.user',
                'tagPositions' => function ($query) {
                    $query->with('item:item_id,item_name,image_url'); // image_urlも追加
                }
            ])
            ->first();
    }

    /**
     * レイアウトインスタンスを作成し、データベースに保存
     * @param  string $text
     * @param  int $userId
     * @return Layout
     */
    public function createLayout(string $text, int $userId): Layout
    {
        return $this->layoutModel::create([
            'text' => $text,
            'user_id' => $userId,
        ]);
    }

    /**
     * レイアウトを更新
     * @param  Layout  $layout
     * @param  array $data レイアウトデータ
     * @return Layout
     */
    public function updateLayout(Layout $layout, array $data): Layout
    {
        $this->updateLayoutData($layout, $data);
        $this->resetLayoutItems($layout);
        $this->resetTagPositions($layout);
        $this->createTagPositionsForLayout($layout, $data['image_map_positions'] ?? []);

        return $layout;
    }

    /**
     * レイアウトのデータを更新
     * @param Layout $layout
     * @param array $data
     */
    private function updateLayoutData(Layout $layout, array $data): void
    {
        $layout->fill($data);
        $layout->save();
    }

    /**
     * レイアウトに関連するアイテムのリセット
     * @param Layout $layout
     */
    private function resetLayoutItems(Layout $layout): void
    {
        $layout->items()->detach();
    }

    /**
     * レイアウトに関連するタグ位置のリセット
     * @param Layout $layout
     */
    private function resetTagPositions(Layout $layout): void
    {
        $this->tagPositionModel::where('layout_id', $layout->layout_id)->delete();
    }

    /**
     * レイアウトのイメージマップ座標を登録する
     * @param  Layout $layout
     * @param  array $items レイアウトに使われている商品のデータ
     * @return void
     */
    public function createTagPositionsForLayout(Layout $layout, array $items): void
    {
        foreach ($items as $itemData) {
            $this->tagPositionModel::create([
                'layout_id' => $layout->layout_id,
                'item_id' => $itemData['item_id'],
                'item_name' => $itemData['item_name'],
                'x_position' => $itemData['x_position'],
                'y_position' => $itemData['y_position']
            ]);
        }
    }

    /**
     * レイアウトを削除する
     * @param  Layout  $layout
     * @return void
     */
    public function removeLayout(Layout  $layout): void
    {
        $layout->delete();
    }

    /**
     * レイアウトの閲覧数をインクリメント
     * @param  Layout  $layout
     * @return void
     */
    public function incrementLayoutViewCount(Layout $layout): void
    {
        $layout->increment('view_count');
    }

    /**
     * レイアウトのお気に入り数に指定した数値を加算する
     * @param  int  $layoutId
     * @return void
     */
    public function adjustLayoutFavoriteCount(int $layoutId, int $amount): void
    {
        $layout = $this->layoutModel->find($layoutId);
        if ($layout) {
            $layout->increment('favorite_count', $amount);
        }
    }

    /**
     * 閲覧数が多い順にレイアウトを取得
     * @param  int $number 取得するレイアウト数
     * @return Collection
     */
    public function getTopViewedLayouts(int $number): Collection
    {
        return $this->layoutModel->orderBy('view_count', 'desc')->take($number)->get();
    }

    /**
     * お気に入り数が多い順にレイアウトを取得
     * @param  int $number 取得するレイアウト数
     * @return Collection
     */
    public function getTopFavoriteLayouts(int $number): Collection
    {
        return $this->layoutModel->orderBy('favorite_count', 'desc')->take($number)->get();
    }

    /**
     * 登録日が近い順にレイアウトを取得
     * @param  int $number 取得するレイアウト数
     * @return Collection
     */
    public function getNewlyArrivedLayouts(int $number): Collection
    {
        return $this->layoutModel->orderBy('created_at', 'desc')->take($number)->get();
    }
}
