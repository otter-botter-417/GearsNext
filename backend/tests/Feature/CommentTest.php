<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;

/**
 * このクラスは、コメントに関連するエンドポイントのテストを担当します。
 * それには、コメントの作成、編集、削除などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
class CommentTest extends TestCase
{

    use RefreshDatabase, AuthorizesRequests;

    private $layout;
    private $latestCommentId;
    private $othersCommentId;
    private const TEST_COMMENT_CONTENT = 'これはテストです。';

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        $this->layout = Layout::factory()->create();
        User::factory(3)->create();
        Comment::factory(3)->create();
        $this->createComment();
        $this->latestCommentId = Comment::latest('comment_id')->first()->comment_id;
        // 他のユーザーのコメントを作成
        $otherUser = User::factory()->create();
        $this->actingAs($otherUser);
        $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => 'これは他のユーザーのコメントです。',
                'parent_id' => null
            ]
        );
        $this->othersCommentId = Comment::latest('comment_id')->first()->comment_id;

        // 再び自分を認証
        $this->actingAs($this->user);
    }

    private function createComment()
    {
        $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => self::TEST_COMMENT_CONTENT,
                'parent_id' => null
            ]
        );
    }

    /**
     * コメントが作成できることを確認するテスト
     * @covers \App\Http\Controllers\CommentController::store
     */
    public function testCanCreateParentComment()
    {
        $this->assertDatabaseHas('comments', ['content' => self::TEST_COMMENT_CONTENT, 'user_id' => $this->userId]);
    }

    /**
     * 返信コメントが作成できることを確認するテスト
     * @covers \App\Http\Controllers\CommentController::store
     */
    public function testCanCreateReplyComments()
    {
        // Create reply comment
        $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => 'これは返信テストです。',
                'parent_id' => $this->latestCommentId
            ]
        );
        $this->assertDatabaseHas('comments', ['content' => 'これは返信テストです。', 'user_id' => $this->userId]);
    }

    /**
     * 編集できることを確認するテスト
     * @covers \App\Http\Controllers\CommentController::update
     */
    public function testCanUpdateComment()
    {
        $this->authorizedRequest(
            'PUT',
            '/api/user/layout/comment/' . $this->latestCommentId,
            [
                'content' => 'これは更新テストです。'
            ]
        );
        $this->assertDatabaseHas('comments', ['content' => 'これは更新テストです。', 'user_id' => $this->userId]);
    }

    /**
     * 削除できることを確認するテスト
     * @covers \App\Http\Controllers\CommentController::destroy
     */
    public function testCanDeleteComment()
    {
        $this->authorizedRequest(
            'DELETE',
            '/api/user/layout/comment/' . $this->latestCommentId
        );
        $this->assertDatabaseMissing('comments', ['content' => self::TEST_COMMENT_CONTENT, 'user_id' => $this->userId]);
    }

    /**
     * コメントが空白の場合に作成できないことを確認するテスト
     * @covers \App\Http\Controllers\CommentController::store
     */
    public function testCannotCreateCommentWithEmptyContent()
    {
        $response = $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => '',
                'parent_id' => null
            ]
        );

        $response->assertStatus(422);
    }

    /**
     * 存在しないparent_idでのコメント作成を阻止するテスト
     * @covers \App\Http\Controllers\CommentController::store
     */
    public function testCannotCreateCommentWithInvalidParentId()
    {
        $response = $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => 'This is a comment.',
                'parent_id' => 9999 // Assuming this ID does not exist
            ]
        );

        $response->assertStatus(422);
    }

    /**
     * 存在しないlayout_idでのコメント作成を阻止するテスト
     * @covers \App\Http\Controllers\CommentController::store
     */
    public function testCannotCreateCommentWithInvalidLayoutId()
    {
        $invalidLayoutId = 9999; // 存在しないIDを仮定
        $response = $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $invalidLayoutId,
            [
                'content' => 'これはテストコメントです。',
                'parent_id' => null
            ]
        );

        $response->assertStatus(422);
    }

    /**
     * 他のユーザーが作成したコメントの編集ができないことを確認するテスト
     * @covers \App\Http\Controllers\CommentController::update
     */
    public function testCannotEditOthersComment()
    {
        $response = $this->authorizedRequest(
            'PUT',
            '/api/user/layout/comment/' . $this->othersCommentId,
            [
                'content' => 'これは編集テストです。'
            ]
        );

        $response->assertStatus(403); // Forbidden
    }

    /**
     * 他のユーザーが作成したコメントの削除ができないことを確認するテスト
     * @covers \App\Http\Controllers\CommentController::destroy
     */
    public function testCannotDeleteOthersComment()
    {
        $response = $this->authorizedRequest(
            'DELETE',
            '/api/user/layout/comment/' . $this->othersCommentId
        );

        $response->assertStatus(403); // Forbidden
    }


    /**
     * コメントの長さや形式に対するバリデーションテスト
     * @covers \App\Http\Controllers\CommentController::store
     */
    public function testCommentValidation()
    {
        // 長いコメント
        $longComment = str_repeat('a', 5001);
        $response = $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => $longComment,
                'parent_id' => null
            ]
        );
        $response->assertStatus(422);

        // HTMLタグを含むコメント
        $htmlComment = '<script>alert("hack!");</script>';
        $response = $this->authorizedRequest(
            'POST',
            '/api/user/layout/comment/' . $this->layout->layout_id,
            [
                'content' => $htmlComment,
                'parent_id' => null
            ]
        );
        $response->assertStatus(422);
    }
}
