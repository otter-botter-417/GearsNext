<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Item;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\AuthorizesRequests;

class FavoriteItemControllerTest extends TestCase
{
    use RefreshDatabase, AuthorizesRequests;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        $this->authorizedRequest('POST', '/api/user/favorite/items/1');
    }

    /**
     * お気に入りに商品を追加
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_user_can_add_item_to_favorite()
    {
        $this->assertDatabaseHas('favorite_items', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * お気に入りから商品を削除
     * @covers \App\Http\Controllers\FavoriteItemController::destroy
     */
    public function test_destroy_remove_an_favorite_item()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/favorite/items/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('favorite_items', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * 登録されているお気に入り商品を取得
     * @covers \App\Http\Controllers\FavoriteItemController::show
     */
    public function test_index_get_favorite_items()
    {
        $response = $this->authorizedRequest('GET', '/api/user/favorite/items');
        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                    'item_id',
                    'item_name',
                    'price',
                    'image_name',
                    'asin',
                ]
            ])
            ->assertJsonFragment(['item_name' => "ソロベースEX",]);
    }

    /**
     * お気に入りに商品を追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_store_add_an_favorite_item_with_not_found_item()
    {
        $userData = ['itemId' => 999];
        $response = $this->authorizedRequest('POST', '/api/user/favorite/items/1');
        $response->assertStatus(404);
    }
}
