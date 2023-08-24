<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Http\Request;
use \Illuminate\Http\Response;
use \Illuminate\Http\JsonResponse;

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
     * @param  Request  $request
     * @return JsonResponse
     */
    public function register(UserRegisterRequest $request): JsonResponse
    {
        $registerData = $request->only(['user_name', 'email', 'password']);
        $token = $this->userService->register($registerData);
        return response()->json(['token' => $token], 201);
    }

    /**
     * ログイン
     * @param  Request  $request
     * @return JsonResponse
     * @throws LoginFailedException ログインに失敗した場合
     */
    public function login(UserLoginRequest $request): JsonResponse
    {
        $loginRequest = $request->only(['email', 'password']);
        $token = $this->userService->login($loginRequest);
        return response()->json(['token' => $token], 200);
    }

    /**
     * ログアウト
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    //TODO frontend側でJWTを削除する　localStorage.removeItem('token');
    {
        auth('api')->logout(); // トークンを無効化
        return response()->json(['message' => 'ログアウトしました。'], 200);
    }

    /**
     * ユーザー情報の更新
     * @param  Request  $request
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
}
