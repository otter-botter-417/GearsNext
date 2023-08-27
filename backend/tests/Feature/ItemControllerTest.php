<?php

namespace Tests\Feature;

use App\Models\Item;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * このクラスは、商品に関連するエンドポイントのテストを担当します。
 * それには、商品の登録、取得、更新、削除などの操作が含まれます。
 */
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
     * 商品登録
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_registers_an_item()
    {
        $itemData = [
            'itemData' => [
                'baseData' => [
                    'item_name' => 'ソロベースEX',
                    'asin' => 'B08B7ZZCST',
                    'image_name' => 'solobase_ex',
                    'price' => 25960,
                    'open_width' => '123',
                    'open_depth' => '123',
                    'open_height' => '123',
                    'storage_width' => '123',
                    'storage_depth' => '123',
                    'storage_height' => '123',
                    'weight' => '3.34',
                    'brand_name' => 'BUNDOK',
                    'item_category_name' => 'テント',
                    'sub_category_name' => 'パップテント',
                ],
                'itemTags' =>
                [
                    0 => '無骨',
                    1 => '難燃素材',
                ],
                'colorTags' =>
                [
                    0 => 'オリーブ',
                    1 => 'レッド',
                ],
                'details' =>
                [
                    'capacity' => '1',
                    'inner_Tent' => '付属',
                    'grand_sheet' => '無し',
                    'fabrics' => 'Test',
                ],

            ],
        ];

        $response = $this->post('/api/items', $itemData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('items', ['item_name' => 'ソロベースEX']);
        $this->assertDatabaseHas('item_attributes', [
            'attribute_name' => 'fabrics',
            'attribute_value' => 'Test',
        ]);
    }

    /**
     * 商品一覧をカテゴリーで取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_returns_items_category()
    {
        $response = $this->get('/api/items?categoryName=テント');

        $response->assertStatus(200)
            ->assertJsonFragment(['item_name' => 'ソロベースEX']);
    }

    /**
     * 商品一覧を全て取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_returns_items_all()
    {
        $response = $this->get('/api/items');
        $response->assertStatus(200)
            ->assertJsonFragment(['item_name' => 'ソロベースEX']);
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
            ->assertJsonStructure([
                'data' => [
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
                    'brand_name',
                    'category_name',
                    'sub_category_name',
                    'item_tags',
                    'color_tags',
                    'item_attributes',
                    'layouts',
                ]
            ]);
    }

    /**
     * 商品情報の更新
     * @covers \App\Http\Controllers\ItemController::update
     */
    public function test_update_updates_item()
    {
        $item = Item::factory()->create();
        $itemData = [
            'itemData' => [
                'baseData' => [
                    'item_name' => 'ソロベースEXtest',
                    'asin' => 'B08B7ZZCST',
                    'image_name' => 'solobase_ex',
                    'price' => 25000,
                    'open_width' => '321',
                    'open_depth' => '312',
                    'open_height' => '321',
                    'storage_width' => '321',
                    'storage_depth' => '312',
                    'storage_height' => '321',
                    'weight' => '3.34',
                    'brand_name' => 'BUNDOK',
                    'item_category_name' => 'テント',
                    'sub_category_name' => 'ドームテント'
                ],
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
                    'inner_Tent' => '付属',
                    'grand_sheet' => '無し',
                    'fabrics' => 'updateTest',
                ],
            ],

        ];

        $response = $this->put("/api/items/{$item->item_id}", $itemData);
        $response->assertStatus(204);
        $this->assertDatabaseHas('items', ['item_name' => 'ソロベースEXtest']);
        $this->assertDatabaseHas('item_attributes', [
            'attribute_name' => 'fabrics',
            'attribute_value' => 'updateTest',
        ]);
    }

    /**
     * 商品の削除
     * @covers \App\Http\Controllers\ItemController::destroy
     */
    public function test_destroy_deletes_item()
    {
        $item = Item::factory()->create();
        $response = $this->delete("/api/items/{$item->item_id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('items', ['item_id' => $item->item_id]);
    }

    /**
     * 存在しない商品IDで商品詳細を取得
     * @covers \App\Http\Controllers\ItemController::show
     */
    public function test_show_with_non_existent_item_id()
    {
        $nonExistentItemId = 9999;  //存在しない商品ID
        $response = $this->get("/api/items/{$nonExistentItemId}");
        $response->assertStatus(422);
    }

    /**
     * 存在しないカテゴリー名で商品一覧をカテゴリーで取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_with_non_existent_category_name()
    {
        $response = $this->get('/api/items?categoryName=カゴ');
        $response->assertStatus(404)
            ->assertJson(['message' => 'カテゴリーが見つかりませんでした。']);
    }

    /**
     * 商品登録時に既に存在する商品を登録しようとした場合
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_fails_when_trying_to_register_already_existing_item()
    {
        $invalidItemData = [
            'itemData' => [
                'baseData' => [
                    'item_name' => 'ソロベースEX',
                    'price' => 25960,
                    'image_name' => "solobase_ex",
                    'asin' => "B0B3W5TG2Y",
                    'open_width' => 360,
                    'open_depth' => 190,
                    'open_height' => 110,
                    'storage_width' => 47,
                    'storage_depth' => 24,
                    'storage_height' => 24,
                    'weight' => '3.34',
                    'brand_name' => 'BUNDOK',
                    'item_category_name' => 'テント',
                    'sub_category_name' => 'パップテント'
                ],
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
                    'inner_tent' => '付属',
                    'grand_sheet' => '無し',
                    'fabrics' => 'TC',
                ],
            ],
        ];

        $response = $this->post('/api/items', $invalidItemData);

        $response->assertStatus(409)
            ->assertJson(['message' => '商品は既に登録されています。']);
    }

    /**
     * 商品登録時にバリデーションエラーが発生　必須項目が空
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_fails_with_validation_error()
    {
        $data = [
            'itemData' => [],
        ];

        $response = $this->postJson('/api/items', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'itemData.baseData.item_name',
                'itemData.baseData.price',
                'itemData.baseData.asin',
                'itemData.baseData.image_name',
                'itemData.baseData.open_width',
                'itemData.baseData.open_depth',
                'itemData.baseData.open_height',
                'itemData.baseData.storage_width',
                'itemData.baseData.storage_depth',
                'itemData.baseData.storage_height',
                'itemData.baseData.weight',
                'itemData.baseData.brand_name',
                'itemData.baseData.item_category_name',
                'itemData.baseData.sub_category_name',
                'itemData.colorTags',

            ]);
    }

    /**
     * 商品登録時にバリデーションエラーが発生　項目の型が不正
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_fails_with_validation_error_invalid_type()
    {
        $data = [
            'itemData' => [
                'item_name' => 123,  //無効な商品名（数値）
                'price' => 'abc',  //無効な価格（文字列）
                'asin' => 123,  //無効なASIN（数値）
                'image_name' => 123,  //無効な画像名（数値）
                'open_width' => 'abc',  //無効な展開時の幅（文字列）
                'open_depth' => 'abc',  //無効な展開時の奥行き（文字列）
                'open_height' => 'abc',  //無効な展開時の高さ（文字列）
                'storage_width' => 'abc',  //無効な収納時の幅（文字列）
                'storage_depth' => 'abc',  //無効な収納時の奥行き（文字列）
                'storage_height' => 'abc',  //無効な収納時の高さ（文字列）
                'weight' => 'abc',  //無効な重量（文字列）
                'brand_name' => 123,  //無効なブランド名（数値）
                'item_category_name' => 123,  //無効な商品カテゴリー名（数値）
                'sub_category_name' => 123,  //無効なサブカテゴリー名（数値）
                'colorTags' =>
                [
                    0 => 123,  //無効なカラータグ（数値）
                ],
            ],
        ];

        $response = $this->postJson('/api/items', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'itemData.baseData.item_name',
                'itemData.baseData.price',
                'itemData.baseData.asin',
                'itemData.baseData.image_name',
                'itemData.baseData.open_width',
                'itemData.baseData.open_depth',
                'itemData.baseData.open_height',
                'itemData.baseData.storage_width',
                'itemData.baseData.storage_depth',
                'itemData.baseData.storage_height',
                'itemData.baseData.weight',
                'itemData.baseData.brand_name',
                'itemData.baseData.item_category_name',
                'itemData.baseData.sub_category_name',
                'itemData.colorTags.0',
            ]);
    }
}
