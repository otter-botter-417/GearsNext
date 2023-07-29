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
        // requestからidを取得して、itemとuserを検索
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        // itemとuserが存在するか確認
        if (!$item) {
            return response()->json(['message' => '商品が見つかりませんでした']);
        } elseif (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした']);
        }

        // 既に登録されているか確認
        $userInventory = UserInventory::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        // 登録されていなければ登録
        if ($userInventory) {
            return response()->json(['message' => '持っている商品に登録されています']);
        } else {
            $item->addInventory($user->user_id);
            return response()->json(['message' => '持っている商品に登録しました']);
        }
    }

    /**
     * ユーザーの持っている商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // serInventoryテーブルからuser_idを取得
        $user = User::where('user_firebase_id', $id)->first();

        // ユーザーがみつかれば、持っている商品を取得
        if ($user) {
            $userInventryDatas = UserInventory::where('user_id', $user->user_id)->with(['items'])->get();
            return response()->json($userInventryDatas, 200);
        } else {
            return response()->json(['message' => 'ユーザーが見つかりませんでした']);
        }
    }
    /**
     * UserInventoryテーブルから削除する
     *
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // requestからidを取得して、itemとuserを検索
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        // 対応するレコードを検索
        $userInventory = UserInventory::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        // 該当するレコードがあれば削除
        if ($userInventory) {
            $userInventory->delete();
            return response()->json(['message' => '持っている商品から削除しました']);
        } else {
            return response()->json(['message' => '持っている商品に登録されていません']);
        }
    }
}
