<?php

namespace App\Services;

use App\Models\Layout;
use App\Models\Comment;
use App\Contracts\CommentRepositoryInterface;
use App\Contracts\LayoutRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * レイアウトへのコメントに関するサービスクラス
 * @package App\Services
 */
class CommentService
{
    /**
     * @var CommentRepositoryInterface
     */
    protected $commentRepository;

    /**
     * @var LayoutRepositoryInterface
     */
    protected $layoutRepository;


    public function __construct(
        CommentRepositoryInterface $commentRepository,
        LayoutRepositoryInterface $layoutRepository,
    ) {
        $this->commentRepository = $commentRepository;
        $this->layoutRepository = $layoutRepository;
    }

    /**
     * レイアウトのコメントを取得
     * @param  Layout $layout
     * @return Collection
     */
    public function getLayoutComments(int $layout_id): Collection
    {
        return $this->commentRepository->getLayoutComments($layout_id);
    }

    /**
     * レイアウトにコメントを追加
     * @param  int  $userId
     * @param  int $layoutId
     * @return void
     */
    public function createLayoutComment(int $userId, int $layout_id, array $commentData): Collection
    {
        $this->commentRepository->createLayoutComment($userId, $layout_id, $commentData);
        return $this->commentRepository->getLayoutComments($layout_id);
    }

    /**
     * レイアウトのコメントを更新
     * @param  Comment $comment
     * @param  string $commentText
     * @return void
     */
    public function updateLayoutComment(Comment $comment, string $commentText): void
    {
        $this->commentRepository->updateLayoutComment($comment, $commentText);
    }

    /**
     * レイアウトのコメントを削除
     * @param  Comment $comment
     * @return Collection
     */
    public function removeLayoutComment(Comment $comment): void
    {
        $this->commentRepository->removeLayoutComment($comment);
    }
}
