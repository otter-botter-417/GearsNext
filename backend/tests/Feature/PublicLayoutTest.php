<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\Layout;
use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * このクラスは、パブリックなレイアウト管理に関連するエンドポイントのテストを担当します。
 * それには、レイアウトの取得、レイアウトの詳細の取得などの操作が含まれます。
 */
class PublicLayoutTest extends TestCase
{
    use RefreshDatabase, AuthorizesRequests;

    private $createdLayoutId;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        Item::factory(3)->create();
        Layout::factory(3)->create();
        $this->createdLayoutId = Layout::latest('layout_id')->first()->layout_id;
    }

    /**
     * レイアウトを取得
     * @covers \App\Http\Controllers\User\LayoutController::index
     */
    public function test_can_get_layouts()
    {
        $response = $this->authorizedRequest('GET', '/api/layout');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'layoutId',
                    'imageName',
                    'text',
                    'userId',
                    'userName',
                    'favoriteCount',
                    'viewCount',
                    'createdAt',
                    'updatedAt',
                    'comments',
                    'items',
                    'tagPositions',
                    'user',
                ]
            ],
        ]);
    }

    /**
     * レイアウトの詳細を取得
     * @covers \App\Http\Controllers\User\LayoutController::show
     */
    public function test_can_get_layout_detail()
    {
        $response = $this->authorizedRequest('GET', '/api/layout/' . $this->createdLayoutId);
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'layoutId',
                    'text',
                    'userName',
                    'favoriteCount',
                    'viewCount',
                    'createdAt',
                    'updatedAt',
                    'comments',
                    'items' => [
                        '*' => [
                            'itemId',
                            'itemName',
                            'imageName',
                        ]
                    ],
                    'tagPositions' => [
                        '*' => [
                            'xPosition',
                            'yPosition',
                            'itemId',
                        ]
                    ]
                ]
            ]);
    }
}
