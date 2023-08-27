<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

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
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'topViewedItems',
            'topFavoriteItems',
            'newlyArrivedItems',
            'topViewedLayouts',
            'topFavoriteLayouts',
            'newlyArrivedLayouts'
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
        $response->assertStatus(200);

        // JSONレスポンスが空であることを確認（例）
        $response->assertJson([]);
    }
}
