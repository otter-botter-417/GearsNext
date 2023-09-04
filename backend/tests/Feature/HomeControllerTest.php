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
                            'itemId',
                            'itemName',
                            'imageName',
                            'favoriteCount',
                            'viewCount'
                        ]
                    ],
                    'topFavoriteItems' => [
                        '*' => [
                            'itemId',
                            'itemName',
                            'imageName',
                            'favoriteCount',
                            'viewCount'
                        ]
                    ],
                    'newlyArrivedItems' => [
                        '*' => [
                            'itemId',
                            'itemName',
                            'imageName',
                            'favoriteCount',
                            'viewCount'
                        ]
                    ],
                    'topViewedLayouts' => [
                        '*' => [
                            'layoutId',
                            'favoriteCount',
                            'viewCount',
                            'userName',
                        ]
                    ],
                    'topFavoriteLayouts' => [
                        '*' => [
                            'layoutId',
                            'favoriteCount',
                            'viewCount',
                            'userName',
                        ]
                    ],
                    'newlyArrivedLayouts' => [
                        '*' => [
                            'layoutId',
                            'favoriteCount',
                            'viewCount',
                            'userName',
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
