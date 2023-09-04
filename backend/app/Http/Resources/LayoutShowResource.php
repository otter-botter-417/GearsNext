<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * レイアウトの詳細を提供するリソースクラスです。
 * このクラスではレイアウトの詳細をJSON形式で返却します。
 * 
 * PublicLayoutControllerのshowメソッドで使用します。
 */
class LayoutShowResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'layoutId' => $this->layout_id,
            'text' => $this->text,
            'userName' => $this->users->user_name,
            'favoriteCount' => $this->favorite_count,
            'viewCount' => $this->view_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'comments' => $this->comments,
            'items' => $this->items->map(function ($item) {
                return [
                    'itemId' => $item->item_id,
                    'itemName' => $item->item_name,
                    'imageName' => $item->image_name,
                ];
            }),
            'tagPositions' => $this->tagPositions,
        ];
    }
}
