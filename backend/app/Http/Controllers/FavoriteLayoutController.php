<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\FavoriteLayoutService;
use App\Http\Requests\FavoriteRequest;
use App\Http\Resources\LayoutResource;
use App\Models\Layout;
use Illuminate\Support\Facades\Log;

class FavoriteLayoutController extends Controller
{
    protected FavoriteLayoutService $favoriteLayoutService;

    public function __construct(FavoriteLayoutService $favoriteLayoutService)
    {
        $this->favoriteLayoutService = $favoriteLayoutService;
    }

    /**
     * ユーザーのお気に入りレイアウトを取得
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $favoriteLayouts = $this->favoriteLayoutService->getFavoriteLayouts(Auth::id());
        return LayoutResource::collection($favoriteLayouts);
    }

    /**
     * FavoriteLayoutテーブルに保存
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Layout $layout): \Illuminate\Http\JsonResponse
    {
        $this->favoriteLayoutService->addFavoriteLayout(Auth::id(), $layout->layout_id);
        return response()->json(['message' => 'お気に入りに登録しました。'], 201);
    }

    /**
     * FavoriteLayoutテーブルから削除する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Layout $layout): \Illuminate\Http\Response
    {
        $this->favoriteLayoutService->removeFavoriteLayout(Auth::id(), $layout);
        return response(null, 204);
    }
}
