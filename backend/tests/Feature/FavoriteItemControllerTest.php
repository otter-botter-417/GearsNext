<?php

namespace Tests\Feature;

use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FavoriteItemControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    /**
     * お気に入りに商品を追加
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_store_add_an_favorite_item()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'お気に入りに登録しました。']);

        $this->assertDatabaseHas('favorite_items', ['item_id' => 1]);
    }

    /**
     * お気に入りに商品を追加時に既にお気に入りに商品が登録されている場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_store_add_an_favorite_item_with_already_favorited_item()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'お気に入りに登録しました。']);

        $this->assertDatabaseHas('favorite_items', ['item_id' => 1]);

        $response = $this->post('/api/user/favorite/items', $userData);

        $response->assertStatus(409)
            ->assertJson(['message' => 'お気に入りに登録されています']);
    }

    /**
     * お気に入りに商品を追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_store_add_an_favorite_item_with_not_found_item()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 99999999999,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);

        $response->assertStatus(404)
            ->assertJson(['message' => '商品が見つかりませんでした']);
    }

    /**
     * お気に入りに商品を追加時にユーザーが見つからない場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_store_add_an_favorite_item_with_not_found_user()
    {
        $userData = [
            'userFirebaseId' => 'notFoundUserFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);


        $response->assertStatus(404)
            ->assertJson(['message' => 'ユーザーが見つかりませんでした']);
    }

    /**
     * お気に入りから商品を削除
     * @covers \App\Http\Controllers\FavoriteItemController::destroy
     */
    public function test_destroy_remove_an_favorite_item()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'お気に入りに登録しました。']);

        $this->assertDatabaseHas('favorite_items', ['item_id' => 1]);

        $response = $this->delete('/api/user/favorite/items', $userData);

        $response->assertStatus(200)
            ->assertJson(['message' => 'お気に入りから削除しました。']);

        $this->assertDatabaseMissing('favorite_items', ['item_id' => 1]);
    }

    /**
     * 登録されているお気に入り商品を取得
     * @covers \App\Http\Controllers\FavoriteItemController::show
     */
    public function test_index_get_favorite_items()
    {

        $item1 = Item::factory()->create();
        $item2 = Item::factory()->create();
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => $item1->item_id,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);

        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => $item2->item_id,
        ];
        $response = $this->post('/api/user/favorite/items', $userData);


        $response = $this->get('/api/user/favorite/items/userFirebaseId');

        $response->assertStatus(200);

        $data = $response->json();
        $this->assertEquals([$item1->item_id, $item2->item_id], $data);
    }
}
