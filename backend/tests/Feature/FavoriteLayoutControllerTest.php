<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;

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
     * お気に入りに商品を追加
     * @covers \App\Http\Controllers\FavoriteLayoutController::store
     */
    public function test_can_add_layout_to_favorite()
    {
        $this->assertDatabaseHas('favorite_layouts', ['layout_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * お気に入りから商品を削除
     * @covers \App\Http\Controllers\FavoriteLayoutController::destroy
     */
    public function test_can_delete_item_from_favorite_layout()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/favorite/layouts/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('favorite_layouts', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * 登録されているお気に入り商品を取得
     * @covers \App\Http\Controllers\FavoriteItemController::show
     */
    public function test_can_get_favorite_layouts()
    {
        $response = $this->authorizedRequest('GET', '/api/user/favorite/layouts');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'layout_id',
                        'text',
                        'user_name',
                        'favorite_count',
                        'view_count',
                        'created_at',
                        'updated_at',
                        'items' => [
                            '*' => [
                                'x_position',
                                'y_position',
                                'item_id',
                                'item_name',
                                'image_name'
                            ]
                        ]

                    ]
                ]
            ]);
    }

    /**
     * お気に入りに商品を追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_cannot_add_non_existent_layout_to_favorite_layout()
    {
        $response = $this->authorizedRequest('POST', '/api/user/favorite/layouts/1000');
        $response->assertStatus(404);
    }
}
