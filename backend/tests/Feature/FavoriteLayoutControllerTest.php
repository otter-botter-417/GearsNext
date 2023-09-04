<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * このクラスは、ユーザーのお気に入りレイアウト管理に関連するエンドポイントのテストを担当します。
 * それには、お気に入りへのレイアウトの追加、削除、取得などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
class FavoriteLayoutControllerTest extends TestCase
{
    use RefreshDatabase, AuthorizesRequests;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        $this->authorizedRequest('POST', '/api/user/favorite/layouts/1');
    }

    /**
     * お気に入りにレイアウトを追加
     * @covers \App\Http\Controllers\FavoriteLayoutController::store
     */
    public function test_can_add_layout_to_favorite()
    {
        $this->assertDatabaseHas('favorite_layouts', ['layout_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * お気に入りからレイアウトを削除
     * @covers \App\Http\Controllers\FavoriteLayoutController::destroy
     */
    public function test_can_delete_item_from_favorite_layout()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/favorite/layouts/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('favorite_layouts', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * 登録されているお気に入りレイアウトを取得
     * @covers \App\Http\Controllers\FavoriteItemController::show
     */
    public function test_can_get_favorite_layouts()
    {
        $response = $this->authorizedRequest('GET', '/api/user/favorite/layouts');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'layoutId',
                        'userName',
                        'favoriteCount',
                        'viewCount',
                        'createdAt',
                        'updatedAt',
                    ]
                ]
            ]);
    }

    /**
     * お気に入りにレイアウトを追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_cannot_add_non_existent_layout_to_favorite_layout()
    {
        $response = $this->authorizedRequest('POST', '/api/user/favorite/layouts/1000');
        $response->assertStatus(422);
    }
}
