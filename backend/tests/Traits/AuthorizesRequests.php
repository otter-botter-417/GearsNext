<?php

namespace Tests\Traits;

use App\Models\User;
use App\Models\Item;
use Tymon\JWTAuth\Facades\JWTAuth;

trait AuthorizesRequests
{
    protected  $token;
    protected  $user;

    protected function initializeAuthorization(): void
    {
        $this->seed();
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
        Item::factory(3)->create();
    }

    private function authorizedRequest($method, $url, $data = [])
    {
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->json($method, $url, $data);
    }
}
