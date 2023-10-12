<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Http\Request;
use \Illuminate\Http\Response;
use \Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * ユーザー情報に関する操作を管理するコントローラークラスです。
 * このクラスではユーザーの登録、ログイン、ログアウト、更新、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 */
class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    /**
     * ユーザー登録
     * @param  Request  $request ['user_name', 'email', 'password']
     * @return JsonResponse
     */
    public function register(UserRegisterRequest $request): JsonResponse
    {
        $registerData = $request->only(['user_name', 'email', 'password']);
        $token = $this->userService->register($registerData);
        return response()->json($token, 201);
    }

    /**
     * ログイン
     * @param  Request  $request ['email', 'password']
     * @return JsonResponse
     * @throws LoginFailedException ログインに失敗した場合
     */
    public function login(UserLoginRequest $request): JsonResponse
    {
        $loginRequest = $request->only(['email', 'password']);
        
        // 認証に失敗
        if (!Auth::attempt($loginRequest)) {
            return response()->json(['error' => '認証に失敗しました。ユーザー名またはパスワードが間違っています。'], 401);
        }
        
        // 認証に成功した場合、トークンを返す
        $token = $this->userService->login($loginRequest);
        return response()->json($token, 200);
    }

    /**
     * ログアウト
     * @return JsonResponse
     */
    public function logout(): Response
    {
        auth('api')->logout(); // トークンを無効化
        return response(null, 200);
    }

    /**
     * ユーザー情報の更新
     * @param  Request  $request ['user_name', 'email', 'password']
     * @return Response
     */
    public function update(UserUpdateRequest $request): Response
    {
        $data = $request->only(['user_name', 'email', 'password']);
        $this->userService->updateUserData(Auth::id(), $data);
        return response(null, 204);
    }

    /**
     * ユーザーの削除
     * @return Response
     */
    public function delete(): Response
    {
        $this->userService->deleteUserData(Auth::id());
        auth('api')->logout(); // トークンを無効化
        return response(null, 204);
    }

    /**
     * トークンのリフレッシュ
     * @param  Request $request ['token']
     * @return JsonResponse
     */
    public function refreshToken(Request $request) : JsonResponse
    {
        $token = $request->header('Authorization');
        $token = str_replace('Bearer ', '', $token);
        try {
            $newToken = JWTAuth::setToken($token)->refresh();  // トークンをリフレッシュ

        } catch (JWTException $e) {
            Log::error($e);
            return response()->json(['error' => 'Could not refresh the token'], 401);
        }
    
        // 新しいトークンを返す
        return response()->json(['access_token' => $newToken]);
    }

    public function getAuthenticatedUser(Request $request)
    {   
    // 認証されたユーザーを取得
    $user = Auth::user();
    if (!$user) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }
    $userData = [
        'userId' => $user->user_id,
        'userName' => $user->user_name];
    return response()->json($userData, 200);
    }
}
