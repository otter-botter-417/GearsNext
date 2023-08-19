<?php

namespace App\Http\Controllers;

use App\Http\Resources\LayoutResource;
use App\Services\LayoutService;

/**
 * パブリックなレイアウトに関する操作を管理するコントローラークラスです。
 */
class PublicLayoutController extends Controller
{
    protected $layoutService;

    public function __construct(LayoutService $layoutService)
    {
        $this->layoutService = $layoutService;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $layouts = $this->layoutService->getLayoutsAll();
        return LayoutResource::collection($layouts);
    }

    /**
     * レイアウトの詳細を取得し、閲覧回数をインクリメント
     * 認証ユーザーからのアクセスの場合は閲覧履歴を保存
     * @param  int  $layoutId
     * @return \Illuminate\Http\Response
     */
    public function show(\Illuminate\Http\Request $request, int $layoutId)
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
