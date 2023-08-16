<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * テスト用のユーザーデータ
     * @var array
     */
    private $userData = [
        'name' => 'storeTestUserName',
        'email' => 'storetestUser@test.com',
        'password' => 'storeTestUserPassword',
    ];

    /**
     * テスト用のトークン
     * @var string
     */
    private $token;

    /**
     * ユーザーエンドポイントにPOSTする
     * @param string $method
     * @param string $token
     * @param array $data
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function postToUserEndpointWithToken(string $method, string $token, array $data = [])
    {
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->post('/api/user/' . $method, $data);
    }

    /**
     * テスト前にユーザー登録を行いトークンを取得
     */
    protected function setUp(): void
    {
        parent::setUp();

        $response = $this->post('/api/user/register', $this->userData);
        $this->token = $response->json('token');
    }

    /**
     * ユーザー登録
     * @covers \App\Http\Controllers\UserController::register
     */
    public function test_user_can_register()
    {
        $this->assertDatabaseHas('users', ['name' => 'storeTestUserName']);
    }

    /**
     * ログイン
     * @covers \App\Http\Controllers\UserController::login
     */
    public function test_user_can_login()
    {
        $response = $this->post('/api/user/login', $this->userData);

        $response->assertStatus(200);
    }

    /**
     * ログアウト
     * @covers \App\Http\Controllers\UserController::logout
     */
    public function test_user_can_logout()
    {
        $response = $this->postToUserEndpointWithToken('logout', $this->token);

        $response->assertStatus(200);

        $this->assertFalse(JWTAuth::setToken($this->token)->check());
    }

    /**
     * ユーザー情報更新
     * @covers \App\Http\Controllers\UserController::update
     */
    public function test_user_can_update()
    {
        $updateUserData = [
            'name' => 'updateStoreTestUserName',
            'email' => 'updateStoretestUser@test.com',
            'password' => 'updateStoreTestUserPassword',
            'password_confirmation' => 'updateStoreTestUserPassword',
        ];

        $response = $this->postToUserEndpointWithToken('update', $this->token, $updateUserData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', ['name' => 'updateStoreTestUserName']);
    }

    /**
     * ユーザー削除
     * @covers \App\Http\Controllers\UserController::delete
     */
    public function test_user_can_delete()
    {
        $response = $this->postToUserEndpointWithToken('delete', $this->token);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('users', ['name' => 'storeTestUserName']);
    }

    /**
     * 存在するユーザーのメールアドレスで登録を行うとエラー
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_registration_fails_with_duplicate_email()
    {
        $userData = [
            'name' => 'testStoreTestUserName',
            'email' => 'storetestUser@test.com',
            'password' => 'testStoreTestUserPassword',
        ];

        $response = $this->post('/api/user/register', $userData);

        $response->assertStatus(422)
            ->assertJsonStructure(['password']);
    }

    /**
     * ユーザー登録時にバリデーションエラーが発生　必須項目が空
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_registration_fails_with_empty_required_fields()
    {
        $userData = [
            'name' => '',
            'email' => '',
            'password' => '',
        ];

        $response = $this->post('/api/user/register', $userData);

        $response->assertStatus(422)
            ->assertJsonStructure(['name', 'email', 'password']);
    }

    /**
     * ユーザー登録時にバリデーションエラーが発生　項目の型が不正
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_register_an_user_with_invalid_type()
    {
        $userData = [
            'name' => 123,
            'email' => 123123123123123,
            'password' => 123331,
        ];
        $response = $this->post('/api/user/register', $userData);

        $response->assertStatus(422)
            ->assertJsonStructure(['name', 'email', 'password']);
    }
}
