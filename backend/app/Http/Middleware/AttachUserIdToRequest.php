<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * リクエストにユーザーIDを追加するミドルウェアクラスです。
 * このクラスでは、リクエストにユーザーIDを追加します。
 * このミドルウェアは、認証が必要なリクエストに対してのみ適用されます。
 * 現在は閲覧履歴を保存するAPIに対してのみ適用されています。
 * 未認証の場合は、リクエストにユーザーIDを追加しません。
 */
class AttachUserIdToRequest
{
    public function handle($request, Closure $next)
    {
        try {
            // トークンを取得
            $token = JWTAuth::getToken();

            // トークンがnullの場合、次のミドルウェアに進む
            if ($token === null) {
                return $next($request);
            }

            // トークンをデコードしてペイロードを取得
            $payload = JWTAuth::decode($token);

            // ペイロードからユーザーIDなどの情報を取得
            $userId = $payload['sub'];

            // 必要に応じてリクエストに情報を追加
            $request->attributes->add(['user_id' => $userId]);
        } catch (\Exception $e) {
            return $next($request);
        }
        return $next($request);
    }
}
