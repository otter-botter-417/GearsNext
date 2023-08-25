<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use App\Services\LayoutService;
use App\Http\Resources\LayoutResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * パブリックなレイアウトに関する操作を管理するコントローラークラスです。
 * このクラスではパブリックなレイアウトの取得、詳細の取得などの操作を提供します。
 * 認証は不要です。
 */
//TODO コメントの実装
class PublicLayoutController extends Controller
{

    //TODO 特定の商品に関するレイアウトを取得するAPIを作成する
    protected $layoutService;

    public function __construct(LayoutService $layoutService)
    {
        $this->layoutService = $layoutService;
    }

    /**
     * 全てのレイアウトを取得
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
     * @param  Request $request user_idのみ取得できる
     * @param  Layout  $layout
     * @return JsonResource
     */
    public function show(Request $request, Layout $layout): JsonResource
    {
        $userId = $request->attributes->get('user_id');
        $layoutDetails  = $this->layoutService->getLayoutWithHistory($layout, $userId);
        return  new LayoutResource($layoutDetails);
    }
}
