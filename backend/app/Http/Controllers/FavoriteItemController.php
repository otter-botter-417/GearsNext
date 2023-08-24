<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Services\FavoriteItemService;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * ユーザーのお気に入り商品に関する操作を管理するコントローラークラスです。
 * このクラスではユーザーのお気に入り商品の取得、追加、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 */
class FavoriteItemController extends Controller
{
    protected FavoriteItemService $favoriteItemService;

    public function __construct(FavoriteItemService $favoriteItemService)
    {
        $this->favoriteItemService = $favoriteItemService;
    }

    /**
     * ユーザーのお気に入り商品を取得
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $favoriteItems = $this->favoriteItemService->getFavoriteItems(Auth::id());
        return response()->json($favoriteItems, 200);
    }

    /**
     * ユーザーのお気に入り商品に保存
     * @param  Item  $item
     * @return Response
     */
    public function store(Item $item): Response
    {
        $this->favoriteItemService->addFavoriteItem(Auth::id(), $item->item_id);
        return response(null, 201);
    }

    /**
     * ユーザーのお気に入り商品から削除する
     * @param  Item $item
     * @return Response
     */
    public function destroy(Item $item): Response
    {
        $this->favoriteItemService->removeFavoriteItem(Auth::id(), $item->item_id);
        return response(null, 204);
    }
}
