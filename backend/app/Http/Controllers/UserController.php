<?php

namespace App\Http\Controllers;

use App\Domain\User\UserAuthService;
use App\Domain\User\UserService;
use App\Exceptions\LoginFailedException;
use App\Exceptions\TokenExpiredException;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserDataResource;
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
    protected $userAuthService;


    public function __construct(UserService $userService, UserAuthService $userAuthService)
    {
        $this->userService = $userService;
        $this->userAuthService = $userAuthService;
    }
    /**
     * ユーザー登録
     * @param  Request  $request ['user_name', 'email', 'password']
     * @return JsonResponse
     */
    public function register(UserRegisterRequest $request): JsonResponse
    {
        $registerData = $request->validated();
        $token = $this->userService->userRegister($registerData);
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
        $loginRequest = $request->validated();
        $token = $this->userService->userLogin($loginRequest);
        return response()->json($token, 200);
    }

    /**
     * ログアウト
     * @return JsonResponse
     */
    public function logout(): Response
    {
        $this->userAuthService->tokenInvalidate();
        return response(null, 200);
    }

    /**
     * ユーザー情報の更新
     * @param  Request  $request ['user_name', 'email', 'password']
     * @return Response
     */
    public function update(UserUpdateRequest $request): Response
    {
        $data = $request->validated();
        $this->userService->updateUserData($data);
        return response(null, 204);
    }

    /**
     * ユーザーの削除
     * @return Response
     */
    public function delete(): Response
    {
        $this->userService->deleteUserAndInvalidateToken();
        return response(null, 204);
    }

    /**
     * トークンのリフレッシュ
     * @param  Request $request ['token']
     * @return JsonResponse
     * @throws TokenRefreshFailedException トークンのリフレッシュに失敗した場合
     */
    public function refreshToken(Request $request): JsonResponse
    {
        $token = $request->bearerToken();
        $newToken = $this->userAuthService->refreshToken($token);
        return response()->json(['access_token' => $newToken]);
    }

    /**
     * 認証済みユーザーの時のみユーザー情報を返す
     * @return UserDataResource
     * @throws TokenExpiredException トークンの有効期限が切れている場合
     */
    public function getAuthenticatedUser()
    {
        $userData = $this->userAuthService->getAuthenticatedUser();
        return UserDataResource::collection($userData);
    }
}
