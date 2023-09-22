<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 商品の詳細を提供するリソースクラスです。
 * このクラスでは商品の詳細をJSON形式で返却します。
 * 
 * ItemControllerのindexとshowメソッドで使用します。
 */
class ItemShowResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'itemId' => $this->item_id,
            'itemName' => $this->item_name,
            'price' => $this->price,
            'imageName' => config('constants.ITEM_IMAGE_BASE_URL') . $this->item_id . '.jpg',
            'asin' => $this->asin,
            'openSize' => [
                'openWidth' => $this->open_width,
                'openDepth' => $this->open_depth,
                'openHeight' => $this->open_height,
            ],
            'storageSize' => [
                'storageWidth' => $this->storage_width,
                'storageDepth' => $this->storage_depth,
                'storageHeight' => $this->storage_height,
            ],
            'weight' => $this->weight,
            'favoriteCount' => $this->favorite_count,
            'viewCount' => $this->view_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,

            'brandName' => $this->brand->brand_name,
            'categoryName' => $this->category->category_name,
            'subCategoryName' => $this->subCategory->sub_category_name,
            'itemTags' => $this->itemTags->map(function ($item_tags) {
                return [
                    'itemTagName' => $item_tags->item_tag_name,
                ];
            }),

            'colorTags' => $this->colorTags->map(function ($color_tags) {
                return [
                    'colorTagName' => $color_tags->color_tag_name,
                ];
            }),

            'itemAttributes' => $this->itemAttributes
            ->pluck('attribute_value', 'attribute_name')->toArray(),

            'layouts' => $this->layouts->map(function ($layouts) {
                return [
                    'layoutId' => $layouts->layout_id,
                    'favoriteCount' => $layouts->favorite_count,
                    'viewCount' => $layouts->view_count,
                ];
            }),

            'user' => [
                'isLoggedIn' => $this->isLoggedIn,
                'isFavorited' => $this->userFavoriteExists,
                'isInInventory' => $this->userInventoryExists,
            ],
        ];
    }
}
