<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Layout;
use App\Services\CommentService;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

/**
 * レイアウトへのコメントに関する操作を管理するコントローラークラスです。
 * このクラスではレイアウトへのコメントの投稿、更新、削除の操作を提供します。
 * すべてのメソッドは認証が必要です。
 * 更新、削除はポリシーで本人でのみ操作できます。
 */
class CommentController extends Controller
{
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }
    /**
     * コメントの投稿
     * @param  StoreCommentRequest  $request
     * @param  Layout  $layout
     * @return Response
     */
    public function store(StoreCommentRequest $request, Layout $layout): Response
    {
        $commentData = $request->only(['content', 'parent_id']);
        $this->commentService->createLayoutComment(Auth::id(), $layout, $commentData);
        return response(null, 201);
    }

    /**
     * コメントの更新
     * @param  UpdateCommentRequest  $request
     * @param  Comment  $comment
     * @return Response
     */
    public function update(UpdateCommentRequest $request, Comment $comment): Response
    {
        $this->authorize('update', $comment);
        $this->commentService->updateLayoutComment($comment, $request['content']);
        return response(null, 204);
    }

    /**
     *コメントの削除
     * @param  Comment  $comment
     * @return Response
     */
    public function destroy(Comment $comment): Response
    {
        $this->authorize('delete', $comment);
        $this->commentService->removeLayoutComment($comment);
        return response(null, 204);
    }
}
