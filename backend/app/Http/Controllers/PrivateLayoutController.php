<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use App\Domain\Layout\LayoutService;
use App\Domain\Layout\CreateLayoutService;
use App\Http\Requests\StoreLayoutRequest;
use App\Http\Requests\UpdateLayoutRequest;
use App\Http\Resources\LayoutIndexResource;
use App\Http\Resources\UserLayoutResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * レイアウトに関する操作を管理するコントローラークラスです。
 * このクラスではレイアウトの作成、更新、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 * 更新、削除はポリシーで本人でのみ操作できます。
 */
class PrivateLayoutController extends Controller
{
    protected $layoutService;
    protected $CreateLayoutService;

    public function __construct(
        LayoutService $layoutService,
        CreateLayoutService $CreateLayoutService
    ) {
        $this->layoutService = $layoutService;
        $this->CreateLayoutService = $CreateLayoutService;
    }

    /**
     * ユーザーの登録したレイアウトを取得
     * @return LayoutIndexResource
     */
    public function index(): ResourceCollection
    {
        $layouts = $this->layoutService->getLayouts(Auth::id());
        return UserLayoutResource::collection($layouts);
    }

    /**
     * レイアウトを登録する
     * @param  StoreLayoutRequest  $request
     * @return Response
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function store(StoreLayoutRequest $request)
    {
        $imageFile = $request->file('layout_image');
        $data = $request->only(['text', 'items', 'image_map_positions']);
        $this->CreateLayoutService->createLayout($imageFile, $data, Auth::id());
        return response(null, 201);
    }

    /**
     * レイアウトを更新する
     * @param  UpdateLayoutRequest  $request
     * @param  Layout  $layout
     * @return Response
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function update(UpdateLayoutRequest $request, Layout $layout): Response
    {
        $this->authorize('update', $layout);
        $data = $request->only(['text', 'items', 'image_map_positions']);
        $this->CreateLayoutService->updateLayout($layout, $data);
        return response(null, 204);
    }

    /**
     * レイアウトを削除する
     * @param  Layout  $layout
     * @return Response
     */
    public function destroy(Layout $layout): Response
    {
        $this->authorize('delete', $layout);
        $this->layoutService->removeLayout($layout);
        return response(null, 204);
    }
}
