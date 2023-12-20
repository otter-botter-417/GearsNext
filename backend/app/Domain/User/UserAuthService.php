<?php

namespace App\Domain\User;

use App\Models\User;
use App\Exceptions\TokenExpiredException;
use App\Exceptions\TokenRefreshFailedException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * ユーザーに関するサービスクラス
 * @package App\Services
 */
class UserAuthService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
    ) {
        $this->userRepository = $userRepository;
    }

    /**
     * JWTトークンを発行する
     * @param  User $user
     * @return array
     */
    public function createToken(User $user): array
    {
        $accessToken = JWTAuth::fromUser($user);
        $refreshToken = JWTAuth::fromUser($user, ['aud' => 'refresh']);

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'user' => $user->only(['user_id', 'user_name']),
        ];
    }

    /**
     * トークンを無効化する
     * @return void
     */
    public function tokenInvalidate(): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    /**
     * トークンをリフレッシュする
     * @param  string $token
     * @return array
     * @throws TokenRefreshFailedException トークンのリフレッシュに失敗した場合
     */
    public function refreshToken(string $token): array
    {
        try {
            $newToken = JWTAuth::setToken($token)->refresh();  // トークンをリフレッシュ
            return $newToken;
        } catch (JWTException $e) {
            Log::error($e);
            throw new TokenRefreshFailedException();
        }
    }

    /**
     * ユーザー情報を取得する
     * @param  array $data
     * @return void
     */
    public function getAuthenticatedUser()
    {
        $user = Auth::user();
        if (!$user) {
            throw new TokenExpiredException();
        }
        $userData = [
            'userId' => $user->user_id,
            'userName' => $user->user_name,
        ];
        return response()->json(['user' => $userData]);
    }
}
