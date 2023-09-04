<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * レイアウトの一覧を提供するリソースクラスです。
 * このクラスではレイアウトの一覧をJSON形式で返却します。
 * 
 * PrivateLayoutControllerのindexメソッドで使用します。
 * PublicLayoutControllerのindexメソッドで使用します。
 * FavoriteLayoutControllerのindexメソッドで使用します。
 */
class LayoutIndexResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'layoutId' => $this->layout_id,
            'userName' => $this->users->user_name,
            'favoriteCount' => $this->favorite_count,
            'viewCount' => $this->view_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
