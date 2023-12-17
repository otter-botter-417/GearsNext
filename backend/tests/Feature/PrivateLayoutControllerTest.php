<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\Layout;
use Tests\TestCase;
use Tests\Traits\AuthorizesRequests;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;

/**
 * このクラスは、ユーザーのレイアウト管理に関連するエンドポイントのテストを担当します。
 * それには、レイアウトの登録、取得、更新、削除などの操作が含まれます。
 * AuthorizesRequestsトレイトを使用して、認証済みのリクエストをシミュレートします。
 */
class PrivateLayoutControllerTest extends TestCase
{
    private $item_1;
    private $item_2;
    private $latestLayoutId;

    private $layoutData;

    use RefreshDatabase, AuthorizesRequests;

    protected function setUp(): void
    {
        parent::setUp();
        $this->initializeAuthorization();
        $this->item_1 = Item::factory()->create();  // ここを修正
        $this->item_2 = Item::factory()->create();
    
        $this->layoutData = [
            'layout_image' => UploadedFile::fake()->image('image1.jpg'),  // 仮想のアップロードされたファイル
            'text' => 'これはテストです。',
            'items' => [
                [
                    'item_id' => $this->item_1->item_id,
                ],
                [
                    'item_id' => $this->item_2->item_id,
                ],
            ],
            'image_map_positions' => [
                [
                    'item_id' => $this->item_1->item_id,
                    'item_name' => 'Item1',
                    'x_position' => 10,
                    'y_position' => 20,
                ],
                [
                    'item_id' => $this->item_2->item_id,
                    'item_name' => 'Item2',
                    'x_position' => 100,
                    'y_position' => 200,
                ],
            ]
        ];
    
        // 画像を含む場合、ファイルを送信するために `attach` メソッドを使用する
        $this->authorizedRequest('POST', '/api/user/layout', $this->layoutData, [
            'layout_image' => $this->layoutData['layout_image']
        ]);
        $this->latestLayoutId = Layout::latest('layout_id')->first()->layout_id;
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
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'imageName',
                    'createdAt',
                    'updatedAt',
                ]
            ],
        ]);
    }

    /**
     * レイアウトを更新
     * @covers \App\Http\Controllers\User\PrivateLayoutController::update
     */
    public function test_can_update_layout()
    {
        $update = Item::factory()->create();
        $updateLayoutData = [
            'text' => 'これは更新テストです。',
            'items' => [
                [
                    'item_id' => $update->item_id,
                ],
                [
                    'item_id' => $this->item_1->item_id,
                ],
            ],
            'image_map_positions' => [
                [
                    'item_id' => $update->item_id,
                    'item_name' => $update->item_name,
                    'x_position' => 20,
                    'y_position' => 10,
                ],
                [
                    'item_id' => $this->item_1->item_id,
                    'item_name' => $this->item_1->item_name,
                    'x_position' => 100,
                    'y_position' => 200,
                ],
            ]
        ];
        $response = $this->authorizedRequest('PUT', '/api/user/layout/' . $this->latestLayoutId, $updateLayoutData);
        $response->assertStatus(204);
        $this->assertDatabaseHas('layouts', ['text' => 'これは更新テストです。']);
        $this->assertDatabaseHas('tag_positions', [
            'item_id' => $update->item_id,
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
        $response = $this->authorizedRequest('DELETE', '/api/user/layout/' . $this->latestLayoutId);
        $response->assertStatus(204);
        $this->assertDatabaseMissing('layouts', ['layout_id' => $this->item_1->item_id]);
    }
}
