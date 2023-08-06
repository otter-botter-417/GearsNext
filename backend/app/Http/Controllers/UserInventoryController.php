<?php

namespace App\Http\Controllers;

use App\Http\Requests\InventoryRequest;
use App\Models\User;

// 持っている物
class UserInventoryController extends Controller
{

    // TODO サービスとリポジトリの実装
    /**
     * ユーザーのお気に入り商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $favoriteItems = User::getInventoryItems($id);
        return response()->json($favoriteItems, 200);
    }

    /**
     * UserInventoryテーブルに保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InventoryRequest $request)
    {
        User::addInventory($request['data']['userId'], $request['data']['itemId']);
        return response()->json(['message' => '持っている物に登録しました。'], 201);
    }

    /**
     * UserInventoryテーブルから削除する
     *
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(InventoryRequest $request)
    {
        User::removeInventory($request['data']['userId'], $request['data']['itemId']);
        return response()->json(['message' => '持っている物から削除しました。'], 201);
    }
}
