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
        // ユーザーが既に登録されていなければ登録
        $user = User::where('user_firebase_id', $request['userId'])->first();

        if ($user) {
            return response()->json(['message' => '既に登録されています'], 400);
        } else {
            User::create([
                'user_firebase_id' => $request['userId'],
                'name' => $request['name'],
                'email' => $request['email'],
                'created_at' => now(),
            ]);
            return response()->json(['message' => 'ユーザー登録が完了しました']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
