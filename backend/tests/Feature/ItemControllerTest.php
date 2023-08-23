<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Item;
use Illuminate\Support\Facades\Log;

class ItemControllerTest extends TestCase
{
    use RefreshDatabase;
    //TODO商品の削除と編集のテストを追加する
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
        $response->assertStatus(201);
        $this->assertDatabaseHas('items', ['item_name' => 'ソロベースEX']);
    }

    /**
     * 商品一覧をカテゴリーで取得
     * @covers \App\Http\Controllers\ItemController::index
     */
    public function test_index_returns_items_category()
    {
        $response = $this->get('/api/items?categoryname=テント');

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
            ->assertJsonFragment(['item_name' => $item->item_name]);
    }

    /**
     * 商品情報の更新
     * @covers \App\Http\Controllers\ItemController::update
     */
    public function test_update_updates_item()
    {
        $item = Item::factory()->create();
        $itemData = [
            'itemDatas' => [
                'itemName' => 'ソロベースEXtest',
                'asin' => 'B08B7ZZCST',
                'imageName' => 'solobase_ex',
                'price' => 25000,
                'openWidth' => '321',
                'openDepth' => '312',
                'openHeight' => '321',
                'storageWidth' => '321',
                'storageDepth' => '312',
                'storageHeight' => '321',
                'weight' => '3.34',
                'brandName' => 'BUNDOK',
                'itemCategoryName' => 'テント',
                'subCategoryName' => 'ドームテント',
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

        $response = $this->put("/api/items/{$item->item_id}", $itemData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('items', ['item_name' => 'ソロベースEXtest']);
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
        $nonExistentItemId = 9999; // 存在しない商品ID
        $response = $this->get("/api/items/{$nonExistentItemId}");
        $response->assertStatus(404);
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
            'itemDatas' => [
                'itemName' => 'ソロベースEX',
                'price' => 25960,
                'imageName' => "solobase_ex",
                'asin' => "B0B3W5TG2Y",
                'openWidth' => 360,
                'openDepth' => 190,
                'openHeight' => 110,
                'storageWidth' => 47,
                'storageDepth' => 24,
                'storageHeight' => 24,
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
            'itemDatas' => [],
        ];

        $response = $this->postJson('/api/items', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'itemDatas.itemName',
                'itemDatas.price',
                'itemDatas.asin',
                'itemDatas.imageName',
                'itemDatas.openWidth',
                'itemDatas.openDepth',
                'itemDatas.openHeight',
                'itemDatas.storageWidth',
                'itemDatas.storageDepth',
                'itemDatas.storageHeight',
                'itemDatas.weight',
                'itemDatas.brandName',
                'itemDatas.itemCategoryName',
                'itemDatas.subCategoryName',
                'itemDatas.colorTags',

            ])
            ->assertJsonFragment([
                "itemDatas.itemName" => ["商品名は必須です。"],
                "itemDatas.price" => ["価格は必須です。"],
                "itemDatas.asin" => ["ASINは必須です。"],
                "itemDatas.imageName" => ["画像名は必須です。"],
                "itemDatas.openWidth" => ["展開時の幅は必須です。"],
                "itemDatas.openDepth" => ["展開時の奥行きは必須です。"],
                "itemDatas.openHeight" => ["展開時の高さは必須です。"],
                "itemDatas.storageWidth" => ["収納時の幅は必須です。"],
                "itemDatas.storageDepth" => ["収納時の奥行きは必須です。"],
                "itemDatas.storageHeight" => ["収納時の高さは必須です。"],
                "itemDatas.weight" => ["重量は必須です。"],
                "itemDatas.brandName" => ["ブランド名は必須です。"],
                "itemDatas.itemCategoryName" => ["商品カテゴリー名は必須です。"],
                "itemDatas.subCategoryName" => ["サブカテゴリー名は必須です。"],
                "itemDatas.colorTags" => ["カラータグは必須です。"],
            ]);
    }

    /**
     * 商品登録時にバリデーションエラーが発生　項目の型が不正
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_fails_with_validation_error_invalid_type()
    {
        $data = [
            'itemDatas' => [
                'itemName' => 123, // 無効な商品名（数値）
                'price' => 'abc', // 無効な価格（文字列）
                'asin' => 123, // 無効なASIN（数値）
                'imageName' => 123, // 無効な画像名（数値）
                'openWidth' => 'abc', // 無効な展開時の幅（文字列）
                'openDepth' => 'abc', // 無効な展開時の奥行き（文字列）
                'openHeight' => 'abc', // 無効な展開時の高さ（文字列）
                'storageWidth' => 'abc', // 無効な収納時の幅（文字列）
                'storageDepth' => 'abc', // 無効な収納時の奥行き（文字列）
                'storageHeight' => 'abc', // 無効な収納時の高さ（文字列）
                'weight' => 'abc', // 無効な重量（文字列）
                'brandName' => 123, // 無効なブランド名（数値）
                'itemCategoryName' => 123, // 無効な商品カテゴリー名（数値）
                'subCategoryName' => 123, // 無効なサブカテゴリー名（数値）
                'colorTags' =>
                [
                    0 => 123, // 無効なカラータグ（数値）
                ],
            ],
        ];

        $response = $this->postJson('/api/items', $data);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'itemDatas.itemName',
                'itemDatas.price',
                'itemDatas.asin',
                'itemDatas.imageName',
                'itemDatas.openWidth',
                'itemDatas.openDepth',
                'itemDatas.openHeight',
                'itemDatas.storageWidth',
                'itemDatas.storageDepth',
                'itemDatas.storageHeight',
                'itemDatas.weight',
                'itemDatas.brandName',
                'itemDatas.itemCategoryName',
                'itemDatas.subCategoryName',
                'itemDatas.colorTags.0',
            ])
            ->assertJsonFragment([
                "itemDatas.itemName" => ["商品名は文字列である必要があります。"],
                "itemDatas.price" => ["価格は数値である必要があります。"],
                "itemDatas.asin" => ["ASINは10文字である必要があります。", "ASINは文字列である必要があります。"],
                "itemDatas.imageName" => ["画像名は文字列である必要があります。"],
                "itemDatas.openWidth" => ["展開時の幅は数値である必要があります。"],
                "itemDatas.openDepth" => ["展開時の奥行きは数値である必要があります。"],
                "itemDatas.openHeight" => ["展開時の高さは数値である必要があります。"],
                "itemDatas.storageWidth" => ["収納時の幅は数値である必要があります。"],
                "itemDatas.storageDepth" => ["収納時の奥行きは数値である必要があります。"],
                "itemDatas.storageHeight" => ["収納時の高さは数値である必要があります。"],
                "itemDatas.weight" => ["重量は数値である必要があります。"],
                "itemDatas.brandName" => ["ブランド名は文字列である必要があります。"],
                "itemDatas.itemCategoryName" => ["商品カテゴリー名は文字列である必要があります。"],
                "itemDatas.subCategoryName" => ["サブカテゴリー名は文字列である必要があります。"],
                "itemDatas.colorTags.0" => ["カラータグは文字列である必要があります。"],

            ]);
    }
}
