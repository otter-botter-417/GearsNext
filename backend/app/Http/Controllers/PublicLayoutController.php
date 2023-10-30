<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use App\Domain\Layout\LayoutService;
use App\Http\Resources\LayoutShowResource;
use App\Http\Resources\LayoutIndexResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Log;

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
     * 全てのレイアウトを取得
     * @return ResourceCollection
     */
    public function index(): ResourceCollection
    {
        $layouts = $this->layoutService->getLayoutsAll();
        Log::info($layouts);
        return LayoutIndexResource::collection($layouts);
    }

    /**
     * レイアウトの詳細を取得し、閲覧回数をインクリメント
     * 認証ユーザーからのアクセスの場合は閲覧履歴を保存し、
     * お気に入りとインベントリの有無を返却する
     * @param  Request $request user_idのみ取得できる
     * @param  Layout  $layout
     * @return JsonResource
     */
    public function show(Request $request, Layout $layout): JsonResource
    {
        $userId = $request->attributes->get('user_id');
        $layoutDetails  = $this->layoutService->getLayoutWithHistory($layout, $userId);
        return  new LayoutShowResource($layoutDetails);
    }
}
