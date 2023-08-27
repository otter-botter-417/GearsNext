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
            'layout_id' => $this->layout_id,
            'user_name' => $this->users->user_name,
            'favorite_count' => $this->favorite_count,
            'view_count' => $this->view_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
