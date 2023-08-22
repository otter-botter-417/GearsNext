<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserRegisterRequest;


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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = $this->userService->register($request->userName, $request->email, $request->password);
        $token = $this->userService->createToken($user);
        return response()->json(['token' => $token], 201);
    }

    /**
     * ログイン
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws UserNotFoundException ユーザーが見つからない
     * @throws InvalidPasswordException パスワードが間違っている
     */
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = $this->userService->login($request->email, $request->password);
        $token = $this->userService->createToken($user);
        return response()->json(['token' => $token], 200);
    }

    /**
     * ログアウト
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(): \Illuminate\Http\JsonResponse
    //TODO frontend側でJWTを削除する　localStorage.removeItem('token');
    {
        auth('api')->logout(); // トークンを無効化
        return response()->json(['message' => 'ログアウトしました。'], 200);
    }

    /**
     * ユーザー情報の更新
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UserUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->only(['userName', 'email', 'password']);
        $this->userService->updateUserData(Auth::id(), $data);
        return response()->json(['message' => 'Profile updated successfully'], 200);
    }

    /**
     * ユーザーの削除
     * @return \Illuminate\Http\Response
     */
    public function delete(): \Illuminate\Http\Response
    {

        $this->userService->deleteUserData(Auth::id());
        auth('api')->logout(); // トークンを無効化
        return response(null, 204);
    }
}
