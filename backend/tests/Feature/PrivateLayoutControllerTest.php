<?php

namespace Tests\Feature;

use App\Models\Item;
use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * PrivateLayoutController
 * 
 * このクラスは、ユーザーのレイアウト管理に関連するエンドポイントのテストを担当します。
 * それには、レイアウトの登録、取得、更新、削除などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
class PrivateLayoutControllerTest extends TestCase
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

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        Item::factory(5)->create();
        $this->authorizedRequest('POST', '/api/user/layout', $this->layoutData);
    }

    /**
     * レイアウトを登録
     * @covers \App\Http\Controllers\User\PrivateLayoutController::store
     */
    public function test_can_create_layout()
    {
        $this->assertDatabaseHas('layouts', ['text' => 'これはテストです。']);
    }

    /**
     * レイアウトを取得
     * @covers \App\Http\Controllers\User\PrivateLayoutController::index
     */
    public function test_can_get_layouts()
    {
        $response = $this->authorizedRequest('GET', '/api/user/layout');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'layout_id',
                    'text',
                    'user_name',
                    'favorite_count',
                    'view_count',
                    'created_at',
                    'updated_at',
                    'items' => [
                        '*' => [
                            'x_position',
                            'y_position',
                            'item_id',
                            'item_name',
                            'image_name'
                        ]
                    ]
                ]
            ],
        ]);
    }

    /**
     * レイアウトの詳細を取得
     * @covers \App\Http\Controllers\User\PrivateLayoutController::show
     */
    public function test_can_get_layout_detail()
    {
        $response = $this->authorizedRequest('GET', '/api/user/layout/2');
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
                    'items' => [
                        '*' => [
                            'x_position',
                            'y_position',
                            'item_id',
                            'item_name',
                            'image_name'
                        ]
                    ]
                ]
            ]);
    }

    /**
     * レイアウトを更新
     * @covers \App\Http\Controllers\User\PrivateLayoutController::update
     */
    public function test_can_update_layout()
    {
        $updateLayoutData = [
            'text' => 'これは更新テストです。',
            'items' => [
                [
                    'item_id' => 3,
                    'x_position' => 20,
                    'y_position' => 10,
                ],
                [
                    'item_id' => 2,
                    'x_position' => 100,
                    'y_position' => 200,
                ],
            ]
        ];
        $response = $this->authorizedRequest('PUT', '/api/user/layout/2', $updateLayoutData);
        $response->assertStatus(204);
        $this->assertDatabaseHas('layouts', ['text' => 'これは更新テストです。']);
        $this->assertDatabaseHas('tag_positions', [
            'item_id' => 3,
            'x_position' => 20,
            'y_position' => 10,
        ]);
    }

    /**
     * レイアウトを削除
     * @covers \App\Http\Controllers\User\PrivateLayoutController::destroy
     */
    public function test_can_delete_layout()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/layout/2');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('layouts', ['layout_id' => 2]);
    }
}
