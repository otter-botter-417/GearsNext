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
class UserItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->item->item_id,
            'imageName' => $this->item->image_url,
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
        ];  
    }
}
