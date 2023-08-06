<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Item;

class ItemControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();

        Item::factory()->create();
    }

    /**
     * 商品一覧をカテゴリーで取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_returns_items_category()
    {
        $response = $this->get('/api/items/search?categoryname=テント');

        $response->assertStatus(200)
            ->assertJsonFragment(['item_name' => 'ソロベースEX']);
    }

    /**
     * 商品一覧を全て取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_returns_items_all()
    {
        $response = $this->get('/api/items/search');

        $response->assertStatus(200)
            //レスポンス中のどこかに指定JSONデータが含まれていることを宣言します。
            ->assertJsonFragment(['item_name' => 'ソロベースEX']);
    }

    /**
     * 商品登録
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_registers_an_item()
    {
        $itemData = [
            'itemDatas' => [
                'itemName' => 'ソロベースEX',
                'asin' => 'B08B7ZZCST',
                'imageName' => 'solobase_ex',
                'price' => 25960,
                'openWidth' => '123',
                'openDepth' => '123',
                'openHeight' => '123',
                'storageWidth' => '123',
                'storageDepth' => '123',
                'storageHeight' => '123',
                'weight' => '3.34',
                'brandName' => 'BUNDOK',
                'itemCategoryName' => 'テント',
                'subCategoryName' => 'パップテント',
                'itemTags' =>
                [
                    0 => '無骨',
                    1 => '難燃素材',
                ],
                'colorTags' =>
                [
                    0 => 'オリーブ',
                ],
                'details' =>
                [
                    'capacity' => '1',
                    'innerTent' => '付属',
                    'grandSheet' => '無し',
                    'fabrics' => 'TC',
                ],
            ],
        ];

        $response = $this->post('/api/items', $itemData);

        $response->assertStatus(201)
            ->assertJson(['message' => '商品登録が完了しました']);

        $this->assertDatabaseHas('items', ['item_name' => 'ソロベースEX']);
    }

    /**
     * 商品詳細を取得
     * @covers \App\Http\Controllers\ItemController::show
     */
    public function test_show_returns_item_details()
    {
        $item = Item::factory()->create();

        $response = $this->get("/api/items/{$item->item_id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['item_name' => $item->item_name]);
    }

    /**
     * 存在しない商品IDで商品詳細を取得
     * @covers \App\Http\Controllers\ItemController::show
     */
    public function test_show_with_non_existent_item_id()
    {
        $nonExistentItemId = 9999; // 存在しない商品ID

        $response = $this->get("/api/items/{$nonExistentItemId}");

        $response->assertStatus(404)
            ->assertJson(['message' => '商品が見つかりませんでした']);
    }

    /**
     * 存在しないカテゴリー名で商品一覧をカテゴリーで取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_with_non_existent_category_name()
    {
        $response = $this->get('/api/items/search?categoryname=カゴ');

        $response->assertStatus(404)
            ->assertJson(['message' => 'カテゴリーが見つかりませんでした。']);
    }

    // public function test_store_fails_when_trying_to_register_already_existing_item()
    // {
    //     $invalidItemData = [
    //         'itemDatas' => [
    //             'itemName' => '', // 無効な商品名（空文字）
    //             // 他の必要なフィールドも同様に無効なデータを設定
    //         ],
    //     ];

    //     $response = $this->post('/api/items', $invalidItemData);

    //     $response->assertStatus(422) // 422 Unprocessable Entity
    //         ->assertJson(['message' => 'Validation Error']);
    // }

}
