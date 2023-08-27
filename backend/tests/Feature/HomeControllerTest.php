<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * このクラスは、ホーム画面に関連するエンドポイントのテストを担当します。
 * それには、トップページに表示する商品やレイアウトの取得などの操作が含まれます。
 */
class HomeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        Item::factory(5)->create();
        User::factory(5)->create();
        Layout::factory(5)->create();
    }


    /**
     * ホーム画面の表示
     * @covers \App\Http\Controllers\HomeController::index
     */
    public function test_can_display_home_screen()
    {
        $response = $this->get('/api/home');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'topViewedItems' => [
                        '*' => [
                            'item_id',
                            'item_name',
                            'image_name',
                            'favorite_count',
                            'view_count'
                        ]
                    ],
                    'topFavoriteItems' => [
                        '*' => [
                            'item_id',
                            'item_name',
                            'image_name',
                            'favorite_count',
                            'view_count'
                        ]
                    ],
                    'newlyArrivedItems' => [
                        '*' => [
                            'item_id',
                            'item_name',
                            'image_name',
                            'favorite_count',
                            'view_count'
                        ]
                    ],
                    'topViewedLayouts' => [
                        '*' => [
                            'layout_id',
                            'favorite_count',
                            'view_count',
                            'user_name',
                        ]
                    ],
                    'topFavoriteLayouts' => [
                        '*' => [
                            'layout_id',
                            'favorite_count',
                            'view_count',
                            'user_name',
                        ]
                    ],
                    'newlyArrivedLayouts' => [
                        '*' => [
                            'layout_id',
                            'favorite_count',
                            'view_count',
                            'user_name',
                        ]
                    ]
                ]
            ]);
    }

    /**
     * データがない場合のテスト
     * @covers \App\Http\Controllers\HomeController::index
     */
    public function test_no_data_case()
    {
        // 全てのデータを削除
        Item::query()->delete();
        User::query()->delete();
        Layout::query()->delete();

        $response = $this->get('/api/home');
        $response->assertStatus(200)
            ->assertJson([]);
    }
}
