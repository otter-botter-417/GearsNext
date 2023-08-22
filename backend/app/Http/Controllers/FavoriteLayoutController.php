<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\FavoriteLayoutService;
use App\Http\Requests\FavoriteRequest;
use App\Http\Resources\LayoutResource;
use App\Models\Layout;
use Illuminate\Support\Facades\Log;

/**
 * ユーザーのお気に入りレイアウトに関する操作を管理するコントローラークラスです。
 * このクラスではユーザーのお気に入りレイアウトの取得、追加、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 */
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
     * ユーザーのお気に入りレイアウトに保存
     * @param  Layout  $layout
     * @return \Illuminate\Http\Response
     */
    public function store(Layout $layout): \Illuminate\Http\Response
    {
        $this->favoriteLayoutService->addFavoriteLayout(Auth::id(), $layout->layout_id);
        return response(null, 201);
    }

    /**
     * ユーザーのお気に入りレイアウトから削除する
     *
     * @param  Layout  $layout
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Layout $layout): \Illuminate\Http\Response
    {
        $this->favoriteLayoutService->removeFavoriteLayout(Auth::id(), $layout);
        return response(null, 204);
    }
}
