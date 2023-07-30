<?php

namespace App\Http\Controllers;

use App\Http\Requests\FavoriteRequest;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PgSql\Lob;

class FavoriteItemController extends Controller
{
    // お気に入り

    /**
     * ユーザーのお気に入り商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $favoriteItems = User::getFavoriteItems($id);
        return response()->json($favoriteItems, 200);
    }

    /**
     * FavoriteItemテーブルに保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FavoriteRequest $request)
    {
        User::addFavoriteItem($request['data']['userId'], $request['data']['itemId']);
        return response()->json(['message' => 'お気に入りに登録しました。'], 201);
    }

    /**
     * FavoriteItemテーブルから削除する
     *
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(FavoriteRequest $request)
    {
        User::removeFavorite($request['data']['userId'], $request['data']['itemId']);
        return response()->json(['message' => 'お気に入りから削除しました。'], 201);
    }
}
