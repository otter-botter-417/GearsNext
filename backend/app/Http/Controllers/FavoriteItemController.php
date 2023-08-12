<?php

namespace App\Http\Controllers;

use App\Http\Requests\FavoriteRequest;
use App\Services\FavoriteItemService;

// お気に入り
class FavoriteItemController extends Controller
{
    protected FavoriteItemService $favoriteItemService;

    public function __construct(FavoriteItemService $favoriteItemService)
    {
        $this->favoriteItemService = $favoriteItemService;
    }

    // TODO 編集と削除の実装

    /**
     * ユーザーのお気に入り商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $favoriteItems = $this->favoriteItemService->getFavoriteItems($id);
        return response()->json($favoriteItems, 200);
    }

    /**
     * FavoriteItemテーブルに保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FavoriteRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->favoriteItemService->addFavoriteItem($request->userFirebaseId, $request->itemId);
        return response()->json(['message' => 'お気に入りに登録しました。'], 201);
    }

    /**
     * FavoriteItemテーブルから削除する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(FavoriteRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->favoriteItemService->removeFavoriteItem($request->userFirebaseId, $request->itemId);
        return response()->json(['message' => 'お気に入りから削除しました。'], 201);
    }
}
