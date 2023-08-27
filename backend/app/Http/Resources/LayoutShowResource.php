<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LayoutShowResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'layout_id' => $this->layout_id,
            'text' => $this->text,
            'user_name' => $this->users->user_name,
            'favorite_count' => $this->favorite_count,
            'view_count' => $this->view_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'comments' => $this->comments,
            'items' => $this->items->map(function ($item) {
                return [
                    'item_id' => $item->item_id,
                    'item_name' => $item->item_name,
                    'image_name' => $item->image_name,
                ];
            }),
            'tag_positions' => $this->tagPositions,
        ];
    }
}
