<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\AuthorizesRequests;

class UserInventoryControllerTest extends TestCase
{
    use RefreshDatabase, AuthorizesRequests;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        $this->authorizedRequest('POST', '/api/user/inventory/1');
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
        $response->assertStatus(204);
        $this->assertDatabaseMissing('user_inventories', ['item_id' => 1]);
    }

    /**
     * ユーザーの持っている商品のデータを取得
     * @covers \App\Http\Controllers\UserInventoryController::index
     */
    public function test_index_get_user_inventories()
    {
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
     * 持っている商品に追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_store_add_an_user_inventory_with_not_found_item()
    {
        $response = $this->authorizedRequest('POST', '/api/user/inventory/999');

        $response->assertStatus(404);
    }
}
