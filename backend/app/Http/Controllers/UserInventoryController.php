<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use App\Models\UserInventory;
use Illuminate\Http\Request;

class UserInventoryController extends Controller
{
    // 持っている物登録

    /**
     * userInventoryテーブルに保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        if (!$item) {
            return response()->json(['message' => '商品が見つかりませんでした'], 404);
        } elseif (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした'], 404);
        }

        $userInventory = UserInventory::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        if ($userInventory) {
            return response()->json(['message' => '持っている商品に登録されています'], 409);
        }

        $item->addInventory($user->user_id);
        return response()->json(['message' => '持っている商品に登録しました'], 201);
    }

    /**
     * ユーザーの持っている商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('user_firebase_id', $id)->first();

        if (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした'], 404);
        }

        $userInventryDatas = UserInventory::where('user_id', $user->user_id)->with(['items'])->get();
        return response()->json($userInventryDatas, 200);
    }
    /**
     * UserInventoryテーブルから削除する
     *
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        $userInventory = UserInventory::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        if (!$userInventory) {
            return response()->json(['message' => '持っている商品に登録されていません'], 404);
        }
        $userInventory->delete();
        return response()->json(['message' => '持っている商品から削除しました'], 200);
    }
}
