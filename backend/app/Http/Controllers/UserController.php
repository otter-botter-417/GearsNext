<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Services\UserService;

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
        $this->userService->register($request->userFirebaseId, $request->name, $request->email);
        return response()->json(['message' => 'ユーザー登録が完了しました'], 201);
    }
}
