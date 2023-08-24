<?php

namespace App\Http\Controllers;

use App\Http\Resources\LayoutResource;
use App\Services\LayoutService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * パブリックなレイアウトに関する操作を管理するコントローラークラスです。
 * このクラスではパブリックなレイアウトの取得、詳細の取得などの操作を提供します。
 * 認証は不要です。
 */
class PublicLayoutController extends Controller
{
    protected $layoutService;

    public function __construct(LayoutService $layoutService)
    {
        $this->layoutService = $layoutService;
    }

    /**
     * @return ResourceCollection
     */
    public function index(): ResourceCollection
    {
        $layouts = $this->layoutService->getLayoutsAll();
        return LayoutResource::collection($layouts);
    }

    /**
     * レイアウトの詳細を取得し、閲覧回数をインクリメント
     * 認証ユーザーからのアクセスの場合は閲覧履歴を保存
     * @param  int  $layoutId
     * @return JsonResource
     */
    public function show(Request $request, int $layoutId): JsonResource
    {
        $layout = $this->layoutService->getLayout($layoutId);
        $userId = $request->attributes->get('user_id');
        if ($userId) {
            $this->layoutService->saveViewLayoutHistory($layout, $userId);
        }
        $this->layoutService->incrementLayoutViewCount($layout);

        return  new LayoutResource($layout);
    }
}
