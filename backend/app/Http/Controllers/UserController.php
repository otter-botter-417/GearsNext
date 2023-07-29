<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreUserRequest;

class UserController extends Controller
{
    // ユーザー登録

    /**
     * Userテーブルに保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::where('user_firebase_id', $request['userId'])->first();

        if ($user) {
            return response()->json(['message' => '既に登録されています'], 409);
        }

        User::create([
            'user_firebase_id' => $request['userId'],
            'name' => $request['name'],
            'email' => $request['email'],
            'created_at' => now(),
        ]);
        return response()->json(['message' => 'ユーザー登録が完了しました'], 201);
    }
}
