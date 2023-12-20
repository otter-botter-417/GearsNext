<?php

namespace App\Domain\Layout;

use App\Models\Layout;
use Illuminate\Database\Eloquent\Collection;

interface LayoutRepositoryInterface
{
    /**
     * レイアウトの詳細を取得する
     * @param  Layout $layout
     * @return Layout リレーション先のデータも含めて返す
     * @throws LayoutNotFoundException
     */
    public function getLayoutWithRelations(Layout $layout): Layout;

    /**
     * ユーザーが登録したレイアウトを取得する
     * @param  int $userId
     * @return Collection
     */
    public function getUserLayouts(int $userId): Collection;

    /**
     * 全てのレイアウトを取得する
     * @return Collection
     */
    public function getAllLayouts(): Collection;

    /**
     * レイアウトインスタンスを作成し、データベースに保存
     * @param  string $text
     * @param  int $userId
     * @return Layout
     */
    public function createLayout(string $text, int $userId): Layout;

    /**
     * レイアウトのイメージマップ座標を登録する
     * @param  Layout $layout
     * @param  array $items レイアウトに使われている商品のデータ
     * @return void
     */
    public function createTagPositionsForLayout(Layout $layout, array $items): void;

    /**
     * レイアウトの閲覧数をインクリメント
     * @param  Layout  $layout
     * @return void
     */
    public function incrementLayoutViewCount(Layout $layout): void;

    /**
     * レイアウトのお気に入り数に指定した数値を加算する
     * @param  int  $layoutId
     * @return void
     */
    public function adjustLayoutFavoriteCount(int $layoutId, int $amount): void;

    /**
     * レイアウトを更新する
     * @param  Layout  $layout
     * @param  array $data レイアウトデータ
     * @return Layout
     */
    public function updateLayout(Layout $layout, array $data): Layout;

    /**
     * レイアウトを削除する
     * @param  Layout  $layout
     * @return void
     */
    public function removeLayout(Layout  $layout): void;

    /**
     * 閲覧数が多い順にレイアウトを取得
     * @param  int $number 取得するレイアウト数
     * @return Collection
     */
    public function getTopViewedLayouts(int $number): Collection;

    /**
     * お気に入り数が多い順にレイアウトを取得
     * @param  int $number 取得するレイアウト数
     * @return Collection
     */
    public function getTopFavoriteLayouts(int $number): Collection;

    /**
     * 登録日が近い順にレイアウトを取得
     * @param  int $number 取得するレイアウト数
     * @return Collection
     */
    public function getNewlyArrivedLayouts(int $number): Collection;
}
