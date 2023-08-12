<?php

namespace Tests\Feature;

use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserInventoryControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    /**
     * 持っている商品を追加
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => '持っている商品に登録しました。']);

        $this->assertDatabaseHas('user_inventories', ['item_id' => 1]);
    }

    /**
     * 持っている商品を追加時に既に持っている商品に登録されている場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory_with_already_registered_item()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => '持っている商品に登録しました。']);

        $this->assertDatabaseHas('user_inventories', ['item_id' => 1]);

        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(409)
            ->assertJson(['message' => '既に持っている商品に登録されています。']);
    }

    /**
     * 持っている商品に追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory_with_not_found_item()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 999,
        ];
        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(404)
            ->assertJson(['message' => '商品が見つかりませんでした']);
    }

    /**
     * 持っている商品に追加時にユーザーが見つからない場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory_with_not_found_user()
    {
        $userData = [
            'userFirebaseId' => 'notFoundUser',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(404)
            ->assertJson(['message' => 'ユーザーが見つかりませんでした']);
    }

    /**
     * 持っている商品から削除
     * @covers \App\Http\Controllers\UserInventoryController::destroy
     */
    public function test_destroy_delete_an_user_inventory()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => '持っている商品に登録しました。']);

        $this->assertDatabaseHas('user_inventories', ['item_id' => 1]);

        $response = $this->post('/api/user/inventory/unregister', $userData);

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
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'itemId' => 1,
        ];
        $response = $this->post('/api/user/inventory/register', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => '持っている商品に登録しました。']);

        $this->assertDatabaseHas('user_inventories', ['item_id' => 1]);

        $response = $this->get('/api/user/inventory/userFirebaseId');

        $response->assertStatus(200);
        // ->assertJson([
        //     'userInventories' => [
        //         [
        //             'id' => 1,
        //             'name' => 'testItem',
        //             'price' => 100,
        //             'image' => 'testImage',
        //             'description' => 'testDescription',
        //             'category' => 'testCategory',
        //             'userFirebaseId' => 'userFirebaseId',
        //         ]
        //     ]
        // ]);
    }
}
