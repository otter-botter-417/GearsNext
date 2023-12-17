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
class UserLayoutResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->layout_id,
            'imageName' => config('constants.LAYOUT_IMAGE_BASE_URL') . $this->layout_id . '.jpg',
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
            
        ];  
    }
}
