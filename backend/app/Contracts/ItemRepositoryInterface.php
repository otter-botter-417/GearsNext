<?php

namespace App\Contracts;

use App\Models\Item;
use Illuminate\Database\Eloquent\Collection;

interface ItemRepositoryInterface
{
    /**
     * 関連情報を持つすべての商品を取得
     * @return Collection
     */
    public function getAllItemsWithRelations(): Collection;

    /**
     * カテゴリIDに基づいて商品を取得
     * @param int $categoryId
     * @return Collection
     */
    public function getItemsByCategory(int $categoryId): Collection;

    /**
     * 商品が既に登録されているかASINで確認
     * @param  string $asin
     * @return bool
     * @throws ItemAlreadyRegisteredException 商品が既に登録されている場合
     */
    public function checkItemsExistsByAsin(string $asin): bool;

    /**
     * 商品データからカラータグIDを取得
     * @param  array $colorTags
     * @return array $colorTagIds
     */
    public function getColorTagIds(array $itemData): array;

    /**
     * 商品データから商品タグIDを取得
     * @param  array $itemTags
     * @return array $itemTagIds
     */
    public function getItemTagIds(array $itemTags): array;

    /**
     * 商品データを登録
     * @param array $baseData 商品の基本情報
     * @param array $tagIds ['colorTagIds' => [], 'itemTagIds' => []]
     * @param array $attributesData 商品の属性情報
     * @return void
     */
    public function createItemData(array $baseData, array $tagIds, array $attributesData): void;

    /**
     * 商品に関連する情報を取得
     * @param  Item $item
     * @return Item
     */
    public function getItemDataWithRelations(Item $item): Item;

    /**
     * 商品の閲覧数をインクリメント
     * @param \App\Models\Item $item
     * @return void
     */
    public function incrementViewCount(\App\Models\Item $item): void;

    /**
     * 商品のお気に入り数をインクリメント
     * @param  int  $itemId
     * @return void
     */
    public function incrementItemFavoriteCount(int $itemId): void;

    /**
     * 商品のお気に入り数をデクリメント
     * @param  int  $itemId
     * @return void
     */
    public function decrementItemFavoriteCount(int $itemId): void;
    /**
     * 商品を更新
     * @param Item $item
     * @param array $baseData 商品の基本情報
     * @param array $tagIds ['colorTagIds' => [], 'itemTagIds' => []]
     * @param array $attributesData 商品の属性情報
     * @return void
     */
    public function updateItemData(Item $item, array $baseData, array $tagIds, array $attributesData): void;

    /**
     * 商品を削除
     * @param  Item $item
     * @return void
     */
    public function deleteItem(Item $item): void;

    /**
     * 以下itemService以外で使用するメソッド
     */

    /**
     * 商品を全件取得
     * @return Collection
     */
    public function getAll(): Collection;

    /**
     * 商品をIDで取得
     * @param  int $id
     * @return \App\Models\Item | null
     */
    public function find(int $id): ?\App\Models\Item;

    /**
     * 指定されたIDの配列を元に関連する商品データを取得
     * @param  array $itemIds
     * @return Collection
     */
    public function getItemsByIds(array $itemIds): Collection;

    /**
     * 商品が存在することを確認
     * @param  int $itemId
     * @throws ItemNotFoundException 商品が見つからない場合
     * @return \App\Models\Item
     */
    public function ensureItemExists(int $itemId): \App\Models\Item;

    /**
     * 複数の商品が既に登録されているか確認
     * @param  array $itemIds
     * @return void
     * @throws ItemNotFoundException 商品が見つからない場合
     */
    public function checkItemsExists(array $itemIds): void;

    /**
     * 閲覧数が多い順に商品を取得
     * @param  int $number 取得する商品数
     * @return Collection
     */
    public function getTopViewedItems(int $number): Collection;

    /**
     * お気に入り数が多い順に商品を取得
     * @param  int $number 取得する商品数
     * @return Collection
     */
    public function getTopFavoriteItems(int $number): Collection;

    /**
     * 登録日が近い順に商品を取得
     * @param  int $number 取得する商品数
     * @return Collection
     */
    public function getNewlyArrivedItems(int $number): Collection;
}
