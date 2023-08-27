<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use App\Services\FavoriteLayoutService;
use App\Http\Resources\LayoutIndexResource;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

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
     * @return JsonResponse
     */
    public function index()
    {
        $favoriteLayouts = $this->favoriteLayoutService->getFavoriteLayouts(Auth::id());
        return LayoutIndexResource::collection($favoriteLayouts);
    }

    /**
     * ユーザーのお気に入りレイアウトに保存
     * @param  Layout  $layout
     * @return Response
     */
    public function store(Layout $layout): Response
    {
        $this->favoriteLayoutService->addFavoriteLayout(Auth::id(), $layout->layout_id);
        return response(null, 201);
    }

    /**
     * ユーザーのお気に入りレイアウトから削除する
     *
     * @param  Layout  $layout
     * @return JsonResponse
     */
    public function destroy(Layout $layout): Response
    {
        $this->favoriteLayoutService->removeFavoriteLayout(Auth::id(), $layout->layout_id);
        return response(null, 204);
    }
}
