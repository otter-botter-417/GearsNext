<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 商品の一覧を提供するリソースクラスです。
 * このクラスでは商品の一覧をJSON形式で返却します。
 * 
 * UserInventoryControllerのindexメソッドで使用します。
 * UserFavoriteControllerのindexメソッドで使用します。
 */
class ItemIndexResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'itemId' => $this->item_id,
            'itemName' => $this->item_name,
            'price' => $this->price,
            'imageName' => $this->image_name,
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
        ];
    }
}
