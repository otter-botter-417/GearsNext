<?php

namespace App\Repositories;

use App\Exceptions\ItemAlreadyRegisteredException;
use App\Exceptions\ItemNotFoundException;
use App\Contracts\ItemRepositoryInterface;
use App\Models\Item;
use Illuminate\Support\Facades\Log;


/**
 * 商品リポジトリ
 * @mixin ItemRepositoryInterface
 */
class EloquentItemRepository implements ItemRepositoryInterface
{

    protected $model;

    public function __construct(Item $item)
    {
        $this->model = $item;
    }

    public function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->all();
    }

    public function find(int $id): ?\App\Models\Item
    {
        return $this->model->find($id);
    }

    /**
     * 指定されたIDの配列を元に関連する商品データを取得
     * @param  array $itemIds
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemsByIds(array $itemIds): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->whereIn('item_id', $itemIds)->get();
    }

    /**
     * カテゴリに基づいて商品を取得
     * @param int $categoryId カテゴリID
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemsByCategory(int $categoryId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->where('category_id', $categoryId)->get();
    }

    /**
     * 商品が存在することを確認
     * @param  int $itemId
     * @throws ItemNotFoundException 商品が見つからない場合
     * @return \App\Models\Item
     */
    public function ensureItemExists(int $itemId): \App\Models\Item
    {
        $item = $this->find($itemId);
        if (!$item) {
            Log::error(
                '商品の存在を確認操作中にエラーが発生',
                [
                    'action' => 'ensureItemExists',
                    'itemId' => $itemId
                ]
            );
            throw new ItemNotFoundException();
        }
        return $item;
    }

    /**
     * 複数の商品が既に登録されているか確認
     * @param  array $itemIds
     * @return void
     * @throws ItemNotFoundException 商品が見つからない場合
     */
    public function checkItemsExists(array $itemIds): void
    {
        $items = $this->model->whereIn('item_id', $itemIds)->get();
        if ($items->count() !== count($itemIds)) {
            throw new ItemNotFoundException();
        }
    }

    /**
     * 商品が既に登録されているか確認
     * @param  string $asin
     * @throws ItemAlreadyRegisteredException 商品が既に登録されている場合
     */
    public function ensureItemNotExists(string $asin): void
    {
        if ($this->model->where('asin', $asin)->exists()) {
            throw new ItemAlreadyRegisteredException();
        }
    }

    /**
     * 関連情報を持つすべての商品を取得
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllItemsWithRelations(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->with(['brand', 'category', 'subCategory', 'itemTags', 'colorTags', 'itemAttributes'])->get();
    }

    /**
     * 商品に関連する情報を取得
     * @param  \Illuminate\Database\Eloquent\Builder $item
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemDataWithRelations(\App\Models\Item $item): \Illuminate\Database\Eloquent\Collection
    {
        return $item->with(['brand', 'category', 'subCategory', 'itemTags', 'colorTags', 'itemAttributes'])->get();
    }

    /**
     * 商品データを登録
     * @param  array $itemData
     * @param  array $entities
     * @return \App\Models\Item
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合
     * @throws ColorTagNotFoundException カラータグが見つからない場合
     */
    public function createItemData(array $itemData, array $entities): \App\Models\Item
    {
        $item = new Item();
        $item->item_name = $itemData['itemName'];
        $item->brand_id = $entities['brand']->brand_id;
        $item->price = $itemData['price'];
        $item->image_name = $itemData['imageName'];
        $item->asin = $itemData['asin'];
        $item->open_width = $itemData['openWidth'];
        $item->open_depth = $itemData['openDepth'];
        $item->open_height = $itemData['openHeight'];
        $item->storage_width = $itemData['storageWidth'];
        $item->storage_depth = $itemData['storageDepth'];
        $item->storage_height = $itemData['storageHeight'];
        $item->weight = $itemData['weight'];
        $item->category_id = $entities['category']->category_id;
        $item->sub_category_id = $entities['subCategory']->sub_category_id;
        //TODO　失敗したら例外を投げる
        $item->save();

        //まだここの処理でエラーが出ているので、一旦コメントアウト
        // TODO 以下のコードを修正

        // $colorTag = new ColorTag();
        // Log::info($item);
        // $colorTag->addColorTags($itemData['colorTags'], $item->item_id);
        // $colorTag->save();

        // $itemTag = new ItemTag();
        // $itemTag->addItemTags($itemData['itemTags']);
        // $itemTag->save();

        // $itemAttributes = new ItemAttribute();
        // $itemAttributes->addItemAttributes($itemAttributes, $item->category_id);
        // $itemAttributes->save();
        // if ($item->item_id === null) {
        //     Log::error(
        //         'aaa'
        //     );
        // }
        // if (isset($itemData['itemTags'])) {
        //     $item->addItemTags()->sync($itemData['itemTags']);
        // }

        // if (isset($itemData['colorTags'])) {
        //     $item->colorTags()->sync($itemData['colorTags']);
        // }

        // if (isset($itemData['itemAttributes'])) {
        //     $item->itemAttributes()->sync($itemData['itemAttributes']);
        // }

        return $item;
    }

    /**
     * 商品の閲覧数を増加
     * @param \App\Models\Item $item
     * @return void
     */
    public function incrementViewCount(\App\Models\Item $item): void
    {
        $item->increment('view_count');
    }
}
