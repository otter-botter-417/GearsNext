<?php

namespace App\Contracts;

interface ItemRepositoryInterface
{
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
     * カテゴリに基づいて商品を取得
     * @param int $categoryId カテゴリID
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemsByCategory(int $categoryId): \Illuminate\Database\Eloquent\Collection;

    /**
     * 商品が存在することを確認
     * @param  int $itemId
     * @throws ItemNotFoundException 商品が見つからない場合
     * @return \App\Models\Item
     */
    public function ensureItemExists(int $itemId): \App\Models\Item;

    /**
     * 商品が既に登録されているか確認
     * @param  string $asin
     * @throws ItemAlreadyRegisteredException 商品が既に登録されている場合
     */
    public function ensureItemNotExists(string $asin): void;

    /**
     * 関連情報を持つすべての商品を取得
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllItemsWithRelations(): \Illuminate\Database\Eloquent\Collection;

    /**
     * 商品に関連する情報を取得
     * @param  \App\Models\Item $item
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemDataWithRelations(\App\Models\Item $item): \Illuminate\Database\Eloquent\Collection;

    /**
     * 商品データを登録
     * @param  array $itemData
     * @param  array $entities
     * @return \App\Models\Item
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合
     * @throws ColorTagNotFoundException カラータグが見つからない場合
     */
    public function createItemData(array $itemData, array $entities): \App\Models\Item;

    /**
     * 商品の閲覧数を増加
     * @param \App\Models\Item $item
     * @return void
     */
    public function incrementViewCount(\App\Models\Item $item): void;
}
