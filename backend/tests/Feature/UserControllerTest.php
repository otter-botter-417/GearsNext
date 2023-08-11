<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    /**
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_store_register_an_user()
    {
        $userData = [
            'userFirebaseId' => 'store_test_user_firebase_id',
            'name' => 'storeTestUserName',
            'email' => 'storetestUser@test.com',
        ];
        $response = $this->post('/api/users', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'ユーザー登録が完了しました']);

        $this->assertDatabaseHas('users', ['user_firebase_id' => 'store_test_user_firebase_id']);
    }

    /**
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_store_register_an_user_with_already_registered_user()
    {
        $userData = [
            'userFirebaseId' => 'userFirebaseId',
            'name' => 'test_user_name',
            'email' => 'store_test@test.co.jp',
        ];
        $response = $this->post('/api/users', $userData);

        $response->assertStatus(409)
            ->assertJson(['message' => 'ユーザーは既に登録されています。']);
    }

    /**
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_store_register_an_user_with_already_registered_email()
    {
        $userData = [
            'userFirebaseId' => 'testUserFirebaseId',
            'name' => 'test_user_name',
            'email' => 'test@test.com',
        ];
        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(409)
            ->assertJson(['message' => 'メールアドレスは既に登録されています。']);
    }

    /**
     * ユーザー登録時にバリデーションエラーが発生　必須項目が空
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_store_register_an_user_with_required_empty()
    {
        $userData = [
            'userFirebaseId' => '',
            'name' => '',
            'email' => '',
        ];
        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'userFirebaseId',
                'name',
                'email',
            ])
            ->assertJsonFragment([
                "userFirebaseId" => ["firebaseIDは必須です。"],
                "name" => ["名前は必須です。"],
                "email" => ["メールアドレスは必須です。"],
            ]);
    }

    /**
     * ユーザー登録時にバリデーションエラーが発生　項目の型が不正
     * @covers \App\Http\Controllers\ItemController::store
     */
    public function test_store_register_an_user_with_invalid_type()
    {
        $userData = [
            'userFirebaseId' => 123,
            'name' => 123123123123123123123123123123123123123,
            'email' => 123,
        ];
        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'userFirebaseId',
                'name',
                'email',
            ])
            ->assertJsonFragment([
                "userFirebaseId" => ["firebaseIDは文字列である必要があります。"],
                "name" => ["名前は文字列である必要があります。"],
                "email" => ["メールアドレスの形式が正しくありません。"],
            ]);
    }
}
