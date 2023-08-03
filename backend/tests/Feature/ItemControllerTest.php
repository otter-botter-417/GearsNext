<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Item;
use Illuminate\Support\Facades\Log;

class ItemControllerTest extends TestCase
{
    use RefreshDatabase;

    // public function testDatabase()
    // {
    //     // Run your seeder
    //     $this->seed();
    // }


    public function test_index_returns_items()
    {
        // ファクトリを使用してテストデータを作成
        $this->seed();
        Item::factory()->create();

        // 商品検索のエンドポイントにアクセス
        $response = $this->get('/api/items/search?categoryname=テント');


        // レスポンスのステータスコードとデータを確認
        $response->assertStatus(200)
            ->assertJsonFragment(['item_name' => 'ソロベースEX']);

        $response = $this->get('/api/items/search');


        // レスポンスのステータスコードとデータを確認
        $response->assertStatus(200)
            //レスポンス中のどこかに指定JSONデータが含まれていることを宣言します。
            ->assertJsonFragment(['item_name' => 'ソロベースEX']);
    }

    public function test_store_registers_an_item()
    {
        $this->seed();
        // テストデータを作成
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



        // 商品登録のエンドポイントにPOSTリクエスト
        $response = $this->post('/api/items', $itemData);

        // レスポンスのステータスコードとメッセージを確認
        $response->assertStatus(201)
            ->assertJson(['message' => '商品登録が完了しました']);

        // データベースに商品が登録されたことを確認
        $this->assertDatabaseHas('items', ['item_name' => 'ソロベースEX']);
    }

    public function test_show_returns_item_details()
    {
        // ファクトリを使用してテストデータを作成
        $this->seed();

        $item = Item::factory()->create();

        // 商品詳細のエンドポイントにアクセス
        $response = $this->get("/api/items/{$item->item_id}");

        // レスポンスのステータスコードとデータを確認
        $response->assertStatus(200)
            ->assertJsonFragment(['item_name' => $item->item_name]);
    }
}
