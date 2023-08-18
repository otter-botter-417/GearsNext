<?php

namespace App\Repositories;

use App\Models\Layout;
use App\Models\TagPosition;
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
        $layouts = $this->model->where('user_id', $userId)->with(['items', 'user'])->get();
        return $layouts;
    }

    /**
     * レイアウトを登録する
     * @param string $text
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
     * @param array $items
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
        $layout = $this->model->with(['items', 'user'])->findOrFail($layoutId);
        if (!$layout) {
            throw new LayoutNotFoundException('レイアウトが見つかりませんでした。');
        }
        return $layout;
    }

    /**
     * レイアウトを更新
     * @param  \App\Models\Layout  $layout
     * @param array $data
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
