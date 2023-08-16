<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\FavoriteItemService;
use App\Http\Requests\FavoriteRequest;

// お気に入り
class FavoriteItemController extends Controller
{
    protected FavoriteItemService $favoriteItemService;

    public function __construct(FavoriteItemService $favoriteItemService)
    {
        $this->favoriteItemService = $favoriteItemService;
    }

    /**
     * ユーザーのお気に入り商品を取得
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $favoriteItems = $this->favoriteItemService->getFavoriteItems(Auth::id());
        return response()->json($favoriteItems, 200);
    }

    /**
     * FavoriteItemテーブルに保存
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(FavoriteRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->favoriteItemService->addFavoriteItem(Auth::id(), $request->itemId);
        return response()->json(['message' => 'お気に入りに登録しました。'], 201);
    }

    /**
     * FavoriteItemテーブルから削除する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): \Illuminate\Http\JsonResponse
    {
        $this->favoriteItemService->removeFavoriteItem(Auth::id(), $id);
        return response()->json(['message' => 'お気に入りから削除しました。'], 200);
    }
}
