<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Item;
use App\Models\UserRegister;
use App\Models\FavoriteItem;
use Illuminate\Http\Request;

class FavoriteItemController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 商品とユーザーのidを受け取って、FavoriteItemテーブルに保存する

        // requestからidを取得して、itemとuserを検索
        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = UserRegister::where('user_firebase_id', $request['data']['userId'])->first();

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

        if (!$favorite) {
            $item->addFavorite($user->user_id);
            return response()->json(['message' => 'お気に入りに登録しました']);
        } else {
            return response()->json(['message' => 'お気に入りに登録されています']);
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
        //UserRegisterテーブルからuser_idを検索し、対応する商品を取得
        $user = UserRegister::where('user_firebase_id', $id)->first();
        //ユーザーがみつからなかった場合
        if (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした']);
            //ユーザーがみつかった場合
        } elseif ($user) {
            $favoriteItemDatas = FavoriteItem::where('user_id', $user->user_id)->with(['items'])->get();
            return response()->json($favoriteItemDatas, 200);
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
        Log::info($request);

        $item = Item::where('item_id', $request['data']['itemId'])->first();
        $user = UserRegister::where('user_firebase_id', $request['data']['userId'])->first();

        // 対応するレコードを検索
        $favoriteItem = FavoriteItem::where('user_id', $user->user_id)
            ->where('item_id', $item->item_id)
            ->first();


        if ($favoriteItem) {
            // 該当するレコードを削除
            $favoriteItem->delete();
            return response()->json(['message' => 'お気に入りから削除しました']);
        } else {
            return response()->json(['message' => 'お気に入りに登録されていません']);
        }
    }
}
