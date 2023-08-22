<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\AuthorizesRequests;

class ViewItemHistory extends TestCase
{
    use RefreshDatabase, AuthorizesRequests;

    private $token;
    private $user;

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
            ->assertJsonFragment(['item_name' => $item->item_name]);
        $this->assertDatabaseHas('view_item_histories', [
            'item_id' => $item->item_id,
            'user_id' => $this->user->user_id
        ]);
    }
}
