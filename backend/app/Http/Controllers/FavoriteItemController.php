<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use App\Models\FavoriteItem;
use Illuminate\Http\Request;

class FavoriteItemController extends Controller
{
    // お気に入り登録

    /**
     * FavoriteItemテーブルに保存
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

        $favorite = FavoriteItem::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();
        if ($favorite) {
            return response()->json(['message' => 'お気に入りに登録されています'], 409);
        }

        $item->addFavorite($user->user_id);
        return response()->json(['message' => 'お気に入りに登録しました'], 201);
    }

    /**
     * ユーザーのお気に入り商品を取得
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

        $favoriteItemDatas = FavoriteItem::where('user_id', $user->user_id)->with(['items'])->get();
        return response()->json($favoriteItemDatas, 200);
    }

    /**
     * FavoriteItemテーブルから削除する
     *
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = User::where('user_firebase_id', $request['data']['userId'])->first();

        $favoriteItem = FavoriteItem::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        if (!$favoriteItem) {
            return response()->json(['message' => 'お気に入りに登録されていません'], 404);
        }

        $favoriteItem->delete();
        return response()->json(['message' => 'お気に入りから削除しました'], 200);
    }
}
