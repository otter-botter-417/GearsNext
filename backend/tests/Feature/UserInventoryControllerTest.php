<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserInventoryControllerTest extends TestCase
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

        Item::factory(3)->create();

        $userData = ['itemId' => 1];

        $this->authorizedRequest('POST', '/api/user/inventory', $userData);
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
     * 持っている商品を追加
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_user_can_add_item_to_inventory()
    {
        $this->assertDatabaseHas('user_inventories', ['item_id' => 1]);
    }

    /**
     * 持っている商品から削除
     * @covers \App\Http\Controllers\UserInventoryController::destroy
     */
    public function test_destroy_delete_an_user_inventory()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/inventory/1');

        $response->assertStatus(200)
            ->assertJson(['message' => '持っている商品から削除しました。']);

        $this->assertDatabaseMissing('user_inventories', ['item_id' => 1]);
    }

    /**
     * ユーザーの持っている商品のデータを取得
     * @covers \App\Http\Controllers\UserInventoryController::index
     */
    public function test_index_get_user_inventories()
    {
        $this->assertDatabaseHas('user_inventories', ['item_id' => 1]);

        $response = $this->authorizedRequest('GET', '/api/user/inventory');
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
     * 持っている商品を追加時に既に持っている商品に登録されている場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory_with_already_registered_item()
    {
        $userData = ['itemId' => 1];

        $response = $this->authorizedRequest('POST', '/api/user/inventory', $userData);

        $response->assertStatus(409)
            ->assertJson(['message' => '既に持っている商品に登録されています。']);
    }

    /**
     * 持っている商品に追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory_with_not_found_item()
    {
        $userData = ['itemId' => 999];

        $response = $this->authorizedRequest('POST', '/api/user/inventory', $userData);

        $response->assertStatus(404)
            ->assertJson(['message' => '商品が見つかりませんでした']);
    }
}
