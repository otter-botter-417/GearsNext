<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * このクラスは、ユーザーのインベントリ管理に関連するエンドポイントのテストを担当します。
 * それには、インベントリへのアイテムの追加、削除、取得などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
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
    public function test_can_add_item_to_user_inventory()
    {
        $this->assertDatabaseHas('user_inventories', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * 持っている商品から削除
     * @covers \App\Http\Controllers\UserInventoryController::destroy
     */
    public function test_can_delete_item_from_user_inventory()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/inventory/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('user_inventories', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * ユーザーの持っている商品のデータを取得
     * @covers \App\Http\Controllers\UserInventoryController::index
     */
    public function test_can_get_user_inventories()
    {
        $response = $this->authorizedRequest('GET', '/api/user/inventory');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'item_id',
                        'item_name',
                        'price',
                        'image_name',
                        'asin',
                        'open_size' => [
                            'open_width',
                            'open_depth',
                            'open_height'
                        ],
                        'storage_size' => [
                            'storage_width',
                            'storage_depth',
                            'storage_height'
                        ],
                        'weight',
                        'favorite_count',
                        'view_count',
                        'created_at',
                        'updated_at',
                    ]
                ],
            ]);
    }

    /**
     * 持っている商品に追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\UserInventoryController::store
     */
    public function test_cannot_add_non_existent_item_to_user_inventory()
    {
        $response = $this->authorizedRequest('POST', '/api/user/inventory/999');
        $response->assertStatus(422);
    }
}
