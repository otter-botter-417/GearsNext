<?php

namespace App\Repositories;

use App\Models\Layout;
use App\Models\TagPosition;
use App\Models\ViewLayoutHistory;
use App\Contracts\LayoutRepositoryInterface;
use App\Exceptions\LayoutNotFoundException;

/**
 * レイアウトに関するリポジトリクラス
 * @mixin LayoutRepositoryInterface
 */
class LayoutRepository implements LayoutRepositoryInterface
{
    protected $model;

    public function __construct(Layout $layout)
    {
        $this->model = $layout;
    }

    /**
     * ユーザーが登録したレイアウトを取得する
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLayouts(int $userId): \Illuminate\Database\Eloquent\Collection
    {
        $layouts = $this->model->where('user_id', $userId)->with(['items', 'tagPositions'])->get();
        return $layouts;
    }

    /**
     * 全てのレイアウトを取得する
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLayoutsAll(): \Illuminate\Database\Eloquent\Collection
    {
        $layouts = $this->model->with(['items', 'user'])->get();
        return $layouts;
    }

    /**
     * 指定されたIDの配列を元に関連するレイアウトデータを取得
     * @param  array $layoutIds
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLayoutsByIds(array $layoutIds): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->whereIn('layout_id', $layoutIds)->with(['user', 'tagPositions'])->get();
    }

    /**
     * レイアウトを登録する
     * @param string $text
     * @param int $userId
     * @return Layout
     */
    public function createLayout(string $text, int $userId): Layout
    {
        $layout = Layout::create([
            'text' => $text,
            'user_id' => $userId,
        ]);
        return $layout;
    }

    /**
     * レイアウトに使われている商品を登録する
     * @param Layout $layout
     * @param array $items レイアウトに使われている商品のデータ
     * @return void
     */
    public function createLayoutItems(Layout $layout, array $items): void
    {
        foreach ($items as $itemData) {
            TagPosition::create([
                'layout_id' => $layout->layout_id,
                'item_id' => $itemData['item_id'],
                'x_position' => $itemData['x_position'],
                'y_position' => $itemData['y_position']
            ]);
        }
    }

    /**
     * レイアウトの詳細を取得する
     * @param int $layoutId
     * @return Layout
     * @throws LayoutNotFoundException
     */
    public function getLayout(int $layoutId): Layout
    {
        $layout = $this->model->with(['items', 'user'])->find($layoutId);
        if (!$layout) {
            throw new LayoutNotFoundException();
        }
        return $layout;
    }

    /**
     * レイアウトの閲覧数をインクリメント
     * @param  \App\Models\Layout  $layout
     * @return void
     */
    public function incrementLayoutViewCount(Layout $layout): void
    {
        $layout->increment('view_count');
    }

    /**
     * レイアウトの閲覧履歴を保存する
     * @param  \App\Models\Layout  $layout
     * @param int $userId
     * @return void
     */
    public function saveViewLayoutHistory(Layout $layout, int $userId): void
    {
        ViewLayoutHistory::updateOrInsert(
            ['user_id' => $userId, 'layout_id' => $layout->layout_id],
            ['updated_at' => now()]
        );
    }
    /**
     * レイアウトを更新
     * @param  \App\Models\Layout  $layout
     * @param array $data レイアウトデータ
     * @return void
     */
    public function updateLayout(Layout $layout, array $data): void
    {
        $layout->fill($data);
        $layout->save();
        TagPosition::where('layout_id', $layout->layout_id)->delete();
        $this->createLayoutItems($layout, $data['items']);
    }

    /**
     * レイアウトを削除する
     * @param  \App\Models\Layout  $layout
     * @return void
     */
    public function removeLayout(Layout  $layout): void
    {
        $layout->delete();
    }
}
