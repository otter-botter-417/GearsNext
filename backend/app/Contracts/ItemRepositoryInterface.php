<?php

namespace App\Contracts;

use App\Models\Item;

interface ItemRepositoryInterface
{
    /**
     * 関連情報を持つすべての商品を取得
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllItemsWithRelations(): \Illuminate\Database\Eloquent\Collection;

    /**
     * カテゴリに基づいて商品を取得
     * @param int $categoryId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemsByCategory(int $categoryId): \Illuminate\Database\Eloquent\Collection;

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
     * @param  array $baseData
     * @param  array $tagIds ['colorTagIds' => [], 'itemTagIds' => []]
     * @param  array $attributesData
     * @return void
     */
    public function createItemData(array $baseData, $tagIds, $attributesData): void;

    /**
     * 商品に関連する情報を取得
     * @param  Item $item
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemDataWithRelations(Item $item): \Illuminate\Database\Eloquent\Collection;

    /**
     * 商品の閲覧数をインクリメント
     * @param \App\Models\Item $item
     * @return void
     */
    public function incrementViewCount(\App\Models\Item $item): void;

    /**
     * 商品を更新
     * @param Item $item
     * @param array $itemData
     * @param array $tagIds ['colorTagIds' => [], 'itemTagIds' => []]
     * @param array $attributesData 
     * @return void
     */
    public function updateItemData(Item $item, array $itemData, array $tagIds, array $attributesData): void;

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
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAll(): \Illuminate\Database\Eloquent\Collection;

    /**
     * 商品をIDで取得
     * @param  int $id
     * @return \App\Models\Item | null
     */
    public function find(int $id): ?\App\Models\Item;

    /**
     * 指定されたIDの配列を元に関連する商品データを取得
     * @param  array $itemIds
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemsByIds(array $itemIds): \Illuminate\Database\Eloquent\Collection;

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
}
