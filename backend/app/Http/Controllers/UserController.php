<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;

// ユーザー登録
class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    // TODO 編集と削除の実装 サービスとリポジトリの作成
    /**
     * Userテーブルに保存
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws UserAlreadyRegisteredException ユーザーが既に登録されている場合にスローされます。
     */
    public function store(UserRegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = $this->userService->register($request->name, $request->email, $request->password);
        $token = $this->userService->createToken($user);
        return response()->json(['token' => $token], 201);
    }
}
