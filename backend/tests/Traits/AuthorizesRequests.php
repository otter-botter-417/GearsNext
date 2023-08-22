<?php

namespace Tests\Traits;

use App\Models\User;
use App\Models\Item;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * AuthorizesRequests
 * 
 * このトレイトは、テストケースで認証済みのリクエストをシミュレートするための機能を提供します。
 * JWT認証を使用して、指定されたユーザーとしてリクエストを行うことができます。
 * このトレイトは、APIエンドポイントの認証が必要なテストに使用されます。
 * @mixin \Illuminate\Foundation\Testing\TestCase
 * @property int $userId
 */
trait AuthorizesRequests
{
    private  $token;
    private  $user;
    protected  $userId;

    /**
     * テスト前にユーザー登録を行いトークンを取得
     * @return void
     */
    protected function initializeAuthorization(): void
    {
        $this->seed();
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
        $this->userId  = $this->user->user_id;
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
}
