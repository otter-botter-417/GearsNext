<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
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
        $favorite = FavoriteItem::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        // 登録されていなければ登録
        if ($favorite) {
            return response()->json(['message' => 'お気に入りに登録されています']);
        } else {
            $item->addFavorite($user->user_id);
            return response()->json(['message' => 'お気に入りに登録しました']);
        }
    }

    /**
     * ユーザーのお気に入り商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Userテーブルからuser_idを取得
        $user = User::where('user_firebase_id', $id)->first();

        // ユーザーがみつかれば、お気に入りに登録されている商品を取得
        if ($user) {
            $favoriteItemDatas = FavoriteItem::where('user_id', $user->user_id)->with(['items'])->get();
            return response()->json($favoriteItemDatas, 200);
        } elseif (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした']);
        }
    }

    /**
     * FavoriteItemテーブルから削除する
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
        $favoriteItem = FavoriteItem::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();

        // 該当するレコードがあれば削除
        if ($favoriteItem) {
            $favoriteItem->delete();
            return response()->json(['message' => 'お気に入りから削除しました']);
        } else {
            return response()->json(['message' => 'お気に入りに登録されていません']);
        }
    }
}
