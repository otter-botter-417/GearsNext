<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\AuthorizesRequests;

/**
 * このクラスは、商品詳細閲覧履歴に関連するエンドポイントのテストを担当します。
 * それには、商品詳細閲覧履歴の保存などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
class ViewItemHistory extends TestCase
{
    use RefreshDatabase, AuthorizesRequests;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
    }

    /**
     * 商品詳細を閲覧時に閲覧履歴の保存
     * @covers \App\Http\Controllers\ItemController::show
     */
    public function test_view_item_history_is_saved_when_user_views_item_details()
    {
        $item = Item::factory()->create();
        $response = $this->authorizedRequest('GET', '/api/items/' . $item->item_id);
        $response->assertStatus(200)
            ->assertJsonFragment(['itemName' => $item->item_name]);
        $this->assertDatabaseHas('view_item_histories', [
            'item_id' => $item->item_id,
            'user_id' => $this->user->user_id
        ]);
    }
}
