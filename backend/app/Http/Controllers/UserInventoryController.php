<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Item;
use App\Models\User;
use App\Models\UserInventory;
use Illuminate\Http\Request;

class UserInventoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //商品とユーザーのidを受け取って、userInventoryテーブルに保存する

        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        // 既に登録されているか確認
        $userInventory = UserInventory::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();
        // 登録されていない場合
        Log::info($userInventory);
        if (!$userInventory) {
            $userInventry = new UserInventory;
            $userInventry->user_id = $user->user_id; // ユーザーIDを設定
            $userInventry->item_id = $item->item_id; // 商品IDを設定
            $userInventry->save(); // 保存
            return response()->json(['message' => '持っている商品に登録しました']);
        } else {
            Log::info("登録済み");
            return response()->json(['message' => '持っている商品に登録されています']);
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
        //UserInventoryテーブルからuser_idを検索し、対応する商品を取得
        $user = User::where('user_firebase_id', $id)->first();
        //ユーザーがみつからなかった場合
        if (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした']);
            //ユーザーがみつかった場合
        } else if ($user) {
            $userInventryDatas = UserInventory::where('user_id', $user->user_id)->with(['items'])->get();
            return response()->json($userInventryDatas, 200);
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //商品ページ用　個別の商品データを受け取ったidで検索して返す
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        // 対応するレコードを検索
        $userInventory = UserInventory::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();


        if ($userInventory) {
            // 該当するレコードを削除
            $userInventory->delete();
            return response()->json(['message' => '持っている商品から削除しました']);
        } else {
            return response()->json(['message' => '持っている商品に登録されていません']);
        }
    }
}
