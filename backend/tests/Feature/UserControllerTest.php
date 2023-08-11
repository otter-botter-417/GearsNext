<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @covers \App\Http\Controllers\UserController::store
     */
    public function test_store_register_an_user()
    {
        $userData = [
            'userFirebaseId' => 'test_user_firebase_id',
            'name' => 'test_user_name',
            'email' => 'testUser@test.com',
        ];
        $response = $this->post('/api/users', $userData);

        $response->assertStatus(201)
            ->assertJson(['message' => 'ユーザー登録が完了しました']);

        $this->assertDatabaseHas('users', ['user_firebase_id' => 'test_user_firebase_id']);
    }
}
