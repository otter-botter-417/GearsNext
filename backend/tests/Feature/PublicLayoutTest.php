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

    private $layoutData = [
        'text' => 'これはテストです。',
        'items' => [
            [
                'item_id' => 1,
                'x_position' => 10,
                'y_position' => 20,
            ],
            [
                'item_id' => 2,
                'x_position' => 100,
                'y_position' => 200,
            ],
        ]
    ];

    private $createdLayoutId;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        Item::factory(5)->create();
        $this->authorizedRequest('POST', '/api/user/layout', $this->layoutData);
        $this->createdLayoutId = Layout::latest('layout_id')->first()->layout_id;
    }

    /**
     * レイアウトを取得
     * @covers \App\Http\Controllers\User\LayoutController::index
     */
    public function test_can_get_layouts()
    {
        $response = $this->authorizedRequest('GET', '/api/layout');
        // dd($response->json());
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'layout_id',
                    'user_name',
                    'favorite_count',
                    'view_count',
                    'created_at',
                    'updated_at',
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
        $this->assertDatabaseHas('item_layout', [
            'item_id' => 1,
            'layout_id' => $this->createdLayoutId
        ]);
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'layout_id',
                    'text',
                    'user_name',
                    'favorite_count',
                    'view_count',
                    'created_at',
                    'updated_at',
                    'comments',
                    'items' => [
                        '*' => [
                            'item_id',
                            'item_name',
                            'image_name',
                        ]
                    ],
                    'tag_positions' => [
                        '*' => [
                            'x_position',
                            'y_position',
                            'item_id',
                        ]
                    ]
                ]
            ]);
    }
}
