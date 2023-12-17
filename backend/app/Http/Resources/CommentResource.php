<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * コメントを提供するリソースクラスです。
 * このクラスではコメントの詳細をJSON形式で返却します。
 * 
 * CommentControllerのshow,storeメソッドで使用します。
 */
class CommentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'commentId' => $this->comment_id,
            'layoutId' => $this->layout_id,
            'content' => $this->content,
            'userName' => $this->user->user_name,
            'parentId' => $this->parent_id,
            'createdAt' => $this->created_at->toIso8601String(),
        ];
    }
}