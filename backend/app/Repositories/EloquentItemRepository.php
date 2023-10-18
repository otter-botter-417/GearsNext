<?php

namespace App\Repositories;

use App\Models\Item;
use App\Models\ColorTag;
use App\Models\ItemTag;
use App\Contracts\ItemRepositoryInterface;
use App\Exceptions\ItemNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Storage;
use Aws\Exception\AwsException;
use Illuminate\Contracts\Filesystem\Filesystem;

/**
 * 商品に関するリポジトリクラス
 * @mixin ItemRepositoryInterface
 */
class EloquentItemRepository implements ItemRepositoryInterface
{
    protected $model;

    public function __construct(Item $item)
    {
        $this->model = $item;
    }

    /**
     * 関連情報を持つすべての商品を取得
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllItemsWithRelations(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->with([
            'brand', 'category', 'subCategory',
            'itemTags', 'colorTags', 'itemAttributes'
        ])->get();
    }

    /**
     * カテゴリIdに基づいて商品を取得
     * @param int $categoryId カテゴリID
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getItemsByCategory(int $categoryId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->where('category_id', $categoryId)->get();
    }

    /**
     * 商品が既に登録されているかASINで確認
     * @param  string $asin
     * @return bool
     */
    public function checkItemsExistsByAsin(string $asin): bool
    {
        return $this->model->where('asin', $asin)->exists();
    }

    /**
     * 商品データからカラータグIDを取得
     * @param  array $colorTags
     * @return array $colorTagIds
     */
    public function getColorTagIds(array $colorTags): array
    {
        $colorTagIds = ColorTag::whereIn('color_tag_name', $colorTags)
            ->get('color_tag_id')
            ->pluck('color_tag_id')
            ->toArray();
        return $colorTagIds;
    }

    /**
     * 商品データから商品タグIDを取得
     * @param  array $itemTags
     * @return array $itemTagIds
     */
    public function getItemTagIds(array $itemTags): array
    {
        $itemTagIds = ItemTag::whereIn('item_tag_name', $itemTags)
            ->get('item_tag_id')
            ->pluck('item_tag_id')
            ->toArray();
        return $itemTagIds;
    }

    /**
     * 商品データを登録
     * @param  array $baseData
     * @param  array $tagIds ['colorTagIds' => [], 'itemTagIds' => []]
     * @param  array $attributesData
     * @return void
     */
    public function createItemData(array $baseData, array $tagIds, array $attributesData): void
    {
        DB::transaction(function () use ($baseData, $tagIds, $attributesData) {
            $item = Item::create($baseData); // image_urlは$baseData内にすでに含まれている
            $item->colorTags()->sync($tagIds['colorTagIds']);
            $item->itemTags()->sync($tagIds['itemTagIds']);
            $item->itemAttributes()->createMany($attributesData);
        });
    }

    /**
     * 商品に関連する情報を取得
     * @param  Item $item
     * @return Item
     */
    public function getItemDataWithRelations(Item $item): Item
    {
        return $item->load([
            'brand', 'category', 'subCategory',
            'itemTags', 'colorTags', 'itemAttributes', 'layouts'
        ]);
    }

    /**
     * 商品の閲覧数をインクリメント
     * @param Item $item
     * @return void
     */
    public function incrementViewCount(Item $item): void
    {
        $item->increment('view_count');
    }

    /**
     * 商品のお気に入り数をインクリメント
     * @param  int  $itemId
     * @return void
     */
    public function incrementItemFavoriteCount(int $itemId): void
    {
        $item = $this->find($itemId);
        $item->increment('favorite_count');
    }

    /**
     * 商品のお気に入り数をデクリメント
     * @param  int  $itemId
     * @return void
     */
    public function decrementItemFavoriteCount(int $itemId): void
    {
        $item = $this->find($itemId);
        $item->decrement('favorite_count');
    }

    /**
     * 商品を更新
     * @param array $baseData
     * @param array $tagIds ['colorTagIds' => [], 'itemTagIds' => []]
     * @param array $attributesData 
     * @return void
     */
    public function updateItemData(Item $item, array $baseData, array $tagIds, array $attributesData): void
    {
        DB::transaction(function () use ($item, $baseData, $tagIds, $attributesData) {

            $item->fill($baseData);
            $item->save();

            $item->colorTags()->delete();
            $item->itemTags()->delete();
            $item->itemAttributes()->delete();

            $item->colorTags()->sync($tagIds['colorTagIds']);
            $item->itemTags()->sync($tagIds['itemTagIds']);
            $item->itemAttributes()->createMany($attributesData);
        });
    }

    /**
     * 商品を削除
     * @param  Item $item
     * @return void
     */
    public function deleteItem(Item $item): void
    {
        $item->delete();
    }

    /**
     * 以下itemService以外で使用するメソッド
     */

    /**
     * 商品を全件取得
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->all();
    }

    /**
     * 商品をIDで取得
     * @param  int $id
     * @return \App\Models\Item | null
     */
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
     * 閲覧数が多い順に商品を取得
     * @param  int $number 取得する商品数
     * @return Collection
     */
    public function getTopViewedItems(int $number): Collection
    {
        return $this->model->orderBy('view_count', 'desc')->take($number)->with(['brand'])->get();
    }

    /**
     * お気に入り数が多い順に商品を取得
     * @param  int $number 取得する商品数
     * @return Collection
     */
    public function getTopFavoriteItems(int $number): Collection
    {
        return $this->model->orderBy('favorite_count', 'desc')->take($number)->with(['brand'])->get();
    }

    /**
     * 登録日が近い順に商品を取得
     * @param  int $number 取得する商品数
     * @return Collection
     */
    public function getNewlyArrivedItems(int $number): Collection
    {
        return $this->model->orderBy('created_at', 'desc')->take($number)->with(['brand'])->get();
    }

    // /**
    //  * カテゴリー名から商品を取得
    //  * @param  string $category
    //  * @return Collection
    //  */
    // public function getItemsByCategoryName(string $category): Collection
    // {
    //     return $this->model->where('category_id', $category)
    //         ->with([
    //             'brand', 'category', 'subCategory',
    //             'itemTags', 'colorTags', 'itemAttributes'
    //         ])->get();
    // }
}
