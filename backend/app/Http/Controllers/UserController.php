<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRegisterRequest;

// ユーザー登録
class UserController extends Controller
{
    /**
     * Userテーブルに保存
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * @throws UserAlreadyRegisteredException ユーザーが既に登録されている場合にスローされます。
     */
    public function store(UserRegisterRequest $request)
    {
        User::register($request['userId'], $request['name'], $request['email']);
        return response()->json(['message' => 'ユーザー登録が完了しました'], 201);
    }
}
