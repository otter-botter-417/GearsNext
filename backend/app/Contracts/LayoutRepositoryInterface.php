<?php

namespace App\Contracts;

use App\Models\Layout;

interface LayoutRepositoryInterface
{
    /**
     * ユーザーが登録したレイアウトを取得する
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLayouts(int $userId): \Illuminate\Database\Eloquent\Collection;

    /**
     * レイアウトを登録する
     * @param string $text
     * @return Layout
     */
    public function createLayout(string $text, int $userId): Layout;

    /**
     * レイアウトに使われている商品を登録する
     * @param Layout $layout
     * @param array $items
     * @return void
     */
    public function createLayoutItems(Layout $layout, array $items): void;

    /**
     * レイアウトの詳細を取得する
     * @param int $layoutId
     * @return Layout
     * @throws LayoutNotFoundException
     */
    public function getLayout(int $layoutId): Layout;

    /**
     * レイアウトを更新する
     * @param  \App\Models\Layout  $layout
     * @param array $data
     * @return void
     */
    public function updateLayout(Layout $layout, array $data): void;

    /**
     * レイアウトに使われている商品を更新する
     * @param Layout $layout
     * @param array $items
     * @return void
     */
    public function updateLayoutItems(Layout $layout, array $items): void;

    /**
     * レイアウトを削除する
     * @param  \App\Models\Layout  $layout
     * @return void
     */
    public function removeLayout(Layout  $layout): void;
}
