<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * このクラスは、ユーザーのお気に入り管理に関連するエンドポイントのテストを担当します。
 * それには、お気に入りへのアイテムの追加、削除、取得などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
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
    public function test_can_add_item_to_favorite()
    {
        $this->assertDatabaseHas('favorite_items', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * お気に入りから商品を削除
     * @covers \App\Http\Controllers\FavoriteItemController::destroy
     */
    public function test_can_delete_item_from_favorite_item()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/favorite/items/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('favorite_items', ['item_id' => 1, 'user_id' => $this->userId]);
    }

    /**
     * 登録されているお気に入り商品を取得
     * @covers \App\Http\Controllers\FavoriteItemController::show
     */
    public function test_can_get_favorite_items()
    {
        $response = $this->authorizedRequest('GET', '/api/user/favorite/items');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'itemId',
                        'itemName',
                        'price',
                        'imageName',
                        'asin',
                        'openSize' => [
                            'openWidth',
                            'openDepth',
                            'openHeight'
                        ],
                        'storageSize' => [
                            'storageWidth',
                            'storageDepth',
                            'storageHeight'
                        ],
                        'weight',
                        'favoriteCount',
                        'viewCount',
                        'createdAt',
                        'updatedAt',
                    ]
                ],
            ]);
    }

    /**
     * お気に入りに商品を追加時に商品が見つからない場合
     * @covers \App\Http\Controllers\FavoriteItemController::store
     */
    public function test_cannot_add_non_existent_item_to_favorite_item()
    {
        $response = $this->authorizedRequest('POST', '/api/user/favorite/items/999');
        $response->assertStatus(422);
    }
}
