<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRegisterRequest;

class UserController extends Controller
{
    // ユーザー登録

    /**
     * Userテーブルに保存
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRegisterRequest $request)
    {
        User::register($request['userId'], $request['name'], $request['email']);
        return response()->json(['message' => 'ユーザー登録が完了しました'], 201);
    }
}
