<?php

namespace App\Domain\Comment;

use App\Models\Comment;
use App\Domain\Comment\CommentRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * レイアウトのコメントに関するリポジトリクラス
 * @mixin CommentRepositoryInterface
 */
class CommentRepository implements CommentRepositoryInterface
{
    protected $model;

    public function __construct(Comment $comment)
    {
        $this->model = $comment;
    }

    /**
     * レイアウトのコメントを取得
     * @param  int $layoutId
     * @return Collection
     */
    public function getLayoutComments(int $layoutId): Collection
    {
        return $this->model->where('layout_id', $layoutId)->get();
    }

    /**
     * レイアウトにコメントを追加
     * @param  int  $userId
     * @param  int $layoutId
     * @param  array $commentData
     * @return void
     */
    public function createLayoutComment(int $userId, int $layoutId, array $commentData): void
    {
        $parentId = $commentData['parent_id'] ?? null;
        $this->model->create([
            'user_id' => $userId,
            'layout_id' => $layoutId,
            'content' => $commentData['content'],
            'parent_id' => $parentId,
        ]);
    }

    /**
     * レイアウトのコメントを更新
     * @param  Comment $comment
     * @param  array $commentText
     * @return void
     */
    public function updateLayoutComment(Comment $comment, string $commentText): void
    {
        $comment->update([
            'content' => $commentText,
        ]);
    }

    /**
     * レイアウトのコメントを削除
     * @param  Comment $comment
     * @return void
     */
    public function removeLayoutComment(Comment $comment): void
    {
        $comment->delete();
    }
}
