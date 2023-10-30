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

    private function getItemData(): array
    {
        return [
                'itemData' => [
                    'baseData' => [
                        'item_name' => 'ソロベースEX',
                        'asin' => 'B08B7ZZCST',
                        'price' => 25960,
                        'image_url' => 'solobase_ex',
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
    }


    /**
     * 商品登録
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_registers_an_item()
    {
        $itemData = $this->getItemData();
        $formData = [
            'itemData' => json_encode($itemData)
        ];

        $response = $this->post('/api/items', $formData);
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
            ->assertJsonFragment(['itemName' => 'ソロベースEX']);
    }

    /**
     * 商品一覧を全て取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_returns_items_all()
    {
        $response = $this->get('/api/items');
        $response->assertStatus(200)
            ->assertJsonFragment(['itemName' => 'ソロベースEX']);
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
                    'brandName',
                    'categoryName',
                    'subCategoryName',
                    'itemTags',
                    'colorTags',
                    'itemAttributes',
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
                    'image_url' => 'solobase_ex',
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
        $formData = [
            'itemData' => json_encode($itemData)
        ];

        $response = $this->put("/api/items/{$item->item_id}", $formData);
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
        $response = $this->get('/api/items?category_name=カゴ');
        $response->assertStatus(404)
            ->assertJson(['message' => 'カテゴリーが見つかりませんでした。']);
    }

    /**
     * 商品登録時に既に存在する商品を登録しようとした場合
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_fails_when_trying_to_register_already_existing_item()
    {
        $invalidItemData = $this->getItemData();
        $formData = [
            'itemData' => json_encode($invalidItemData)
        ];

        $this->post('/api/items', $formData);
        $response = $this->post('/api/items', $formData);

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

        $formData = [
            'itemData' => json_encode($data)
        ];

        $response = $this->postJson('/api/items', $formData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'itemData.baseData.item_name',
                'itemData.baseData.price',
                'itemData.baseData.asin',
                'itemData.baseData.image_url',
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
                'baseData' => [
                    'item_name' => 123,
                    'price' => '25960',
                    'image_name' => 123,
                    'asin' => 123,
                    'open_width' => "360",
                    'open_depth' => "190",
                    'open_height' => "110",
                    'storage_width' => "47",
                    'storage_depth' => "24",
                    'storage_height' => "24",
                    'weight' => 3.34,
                    'brand_name' => 123,
                    'item_category_name' => 123,
                    'sub_category_name' => 123,
                ],
                'itemTags' =>
                [
                    0 => '無骨',
                    1 => '難燃素材',
                ],
                'colorTags' =>
                [
                    0 => 2,
                ],
                'details' =>
                [
                    'capacity' => '1',
                    'inner_tent' => '付属',
                    'grand_sheet' => '無し',
                    'fabrics' => 'TC',
                ],
        ];

        $formData = [
            'itemData' => json_encode($data)
        ];

        $response = $this->postJson('/api/items', $formData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'itemData.baseData.item_name',
                'itemData.baseData.price',
                'itemData.baseData.asin',
                'itemData.baseData.image_url',
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
}
