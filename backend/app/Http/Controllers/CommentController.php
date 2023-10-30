<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Layout;
use App\Services\CommentService;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
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
     * コメントの取得
     * @param  Layout  $layout
     * @return ResourceCollection
     */
    public function show(Layout $layout): ResourceCollection
    {
        $comments = $this->commentService->getLayoutComments($layout->layout_id);
        return CommentResource::collection($comments);
    }

    /**
     * コメントの投稿
     * 追加後のレイアウトのコメント一覧を返します。
     * @param  StoreCommentRequest  $request
     * @param  Layout  $layout
     * @return ResourceCollection
     */
    public function store(StoreCommentRequest $request, Layout $layout): ResourceCollection
    {
        $commentData = $request->only(['content', 'parent_id']);
        $newCommentData = $this->commentService->createLayoutComment(Auth::id(), $layout->layout_id, $commentData);
        return CommentResource::collection($newCommentData);
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
