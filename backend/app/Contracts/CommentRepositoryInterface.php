<?php

namespace App\Contracts;

use App\Models\Comment;

interface CommentRepositoryInterface
{
    /**
     * レイアウトにコメントを追加
     * @param  int  $userId
     * @param  int $layoutId
     * @param  array $commentData
     * @return void
     */
    public function createLayoutComment(int $userId, int $layoutId, array $commentData): void;

    /**
     * レイアウトのコメントを更新
     * @param  Comment $comment
     * @param  string $commentText
     * @return void
     */
    public function updateLayoutComment(Comment $comment, string $commentText): void;

    /**
     * レイアウトのコメントを削除
     * @param  Comment $comment
     * @return void
     */
    public function removeLayoutComment(Comment $comment): void;
}
