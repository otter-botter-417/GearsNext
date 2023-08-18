<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Item;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;


class LayoutTest extends TestCase
{
    use RefreshDatabase;

    private $token;
    private $user;

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
        $this->seed();
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
        Item::factory(5)->create();
        $this->authorizedRequest('POST', '/api/user/layout', $this->layoutData);
    }

    /**
     * ユーザーエンドポイントにリクエストを送信する
     * @param string $method HTTPメソッド（GET, POST, PUT, DELETEなど）
     * @param string $url
     * @param array $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function authorizedRequest($method, $url, $data = [])
    {
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->json($method, $url, $data);
    }

    /**
     * レイアウトを登録
     * @covers \App\Http\Controllers\User\LayoutController::store
     */
    public function test_user_can_layout_create()
    {
        $this->assertDatabaseHas('layouts', ['text' => 'これはテストです。']);
    }

    /**
     * レイアウトを取得
     * @covers \App\Http\Controllers\User\LayoutController::index
     */
    public function test_user_can_get_layouts()
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
     * @covers \App\Http\Controllers\User\LayoutController::show
     */
    public function test_user_can_get_layout_detail()
    {
        $this->assertDatabaseHas('layouts', ['layout_id' => 1]);

        $response = $this->authorizedRequest('GET', '/api/user/layout/1');
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
     * @covers \App\Http\Controllers\User\LayoutController::update
     */
    public function test_user_can_update_layout()
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
        $response = $this->authorizedRequest('PUT', '/api/user/layout/1', $updateLayoutData);
        $response->assertStatus(200);
        $this->assertDatabaseHas('layouts', ['text' => 'これは更新テストです。']);
        $this->assertDatabaseHas('tag_positions', [
            'item_id' => 3,
            'x_position' => 20,
            'y_position' => 10,
        ]);
    }

    /**
     * レイアウトを削除
     * @covers \App\Http\Controllers\User\LayoutController::destroy
     */
    public function test_user_can_delete_layout()
    {
        $response = $this->authorizedRequest('DELETE', '/api/user/layout/1');
        $response->assertStatus(204);
        $this->assertDatabaseMissing('layouts', ['layout_id' => 1]);
    }
}
