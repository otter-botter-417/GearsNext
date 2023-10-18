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
            'imageName' => config('constants.LAYOUT_IMAGE_BASE_URL') . $this->layout_id . '.jpg',
            'text' => $this->text,
            'userId' => $this->user_id,
            'userName' => $this->users->user_name,
            'favoriteCount' => $this->favorite_count,
            'viewCount' => $this->view_count,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'comments' => $this->comments->map(function ($comment) {
                return [
                    'commentId' => $comment->comment_id,
                    'layoutId' => $comment->layout_id,
                    'content' => $comment->content,
                    'userName' => $comment->user->user_name,
                    'parentId' => $comment->parent_id,
                    'createdAt' => $comment->created_at,
                ];
            }),
            'items' => $this->items->map(function ($item) {
                return [
                    'itemId' => $item->item_id,
                    'itemName' => $item->item_name,
                    'imageName' => $item->image_url,
                ];
            }),
            'tagPositions' => $this->tagPositions->map(function ($tagPosition) {
                return [
                    'xPosition' => $tagPosition->x_position,
                    'yPosition' => $tagPosition->y_position,
                    'itemId' => $tagPosition->item_id,
                    'itemName' => $tagPosition->item->item_name,
                    'imageUrl' => $tagPosition->item->image_url,
                ];
            }),
            'user' => [
                'isFavorite' => $this->userFavoriteExists,
                // 'isInInventory' => $this->userInventoryLayoutExists,
            ],
        ];
    }
}
