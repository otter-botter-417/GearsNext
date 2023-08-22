<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Item;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FavoriteLayoutControllerTest extends TestCase
{
    use RefreshDatabase;

    private $token;
    private $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
        $this->authorizedRequest('POST', '/api/user/favorite/layouts/1');
    }

    /**
     * ユーザーエンドポイントにリクエストを送信する
     * @param string $method HTTPメソッド（GET, POST, PUT, DELETEなど）
     * @param string $url エンドポイントのURL
     * @param array $data 送信するデータ
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function authorizedRequest($method, $url, $data = [])
    {
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->json($method, $url, $data);
    }

    /**
     * お気に入りに商品を追加
     * @covers \App\Http\Controllers\FavoriteLayoutController::store
     */
    public function test_user_can_add_layout_to_favorite()
    {
        $this->assertDatabaseHas('favorite_layouts', ['layout_id' => 1]);
    }

    /**
     * お気に入りから商品を削除
     * @covers \App\Http\Controllers\FavoriteLayoutController::destroy
     */
    public function test_destroy_remove_an_favorite_item()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/favorite/layouts/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('favorite_layouts', ['item_id' => 1]);
    }

    /**
     * 登録されているお気に入り商品を取得
     * @covers \App\Http\Controllers\FavoriteItemController::show
     */
    public function test_index_get_favorite_items()
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
    public function test_store_add_an_favorite_item_with_not_found_item()
    {
        $response = $this->authorizedRequest('POST', '/api/user/favorite/layouts/1000');
        $response->assertStatus(404);
    }
}
