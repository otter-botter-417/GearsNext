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
    //CommentRepositoryInterface と　CommentRepositoryを実装

    /**
     * レイアウトにコメントを追加
     * @param  int  $userId
     * @return void
     */
    public function createLayoutComment(int $userId, Layout $layout, array $commentData): void
    {
        $this->commentRepository->createLayoutComment($userId, $layout->layout_id, $commentData);
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
