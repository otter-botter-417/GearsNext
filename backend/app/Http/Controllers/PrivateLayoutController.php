<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use App\Services\LayoutService;
use App\Http\Requests\StoreLayoutRequest;
use App\Http\Requests\UpdateLayoutRequest;
use App\Http\Resources\LayoutResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * レイアウトに関する操作を管理するコントローラークラスです。
 * このクラスではレイアウトの作成、更新、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 */
class PrivateLayoutController extends Controller
{
    protected $layoutService;

    public function __construct(LayoutService $layoutService)
    {
        $this->layoutService = $layoutService;
    }

    /**
     * @return Response
     */
    public function index(): ResourceCollection
    {
        $layouts = $this->layoutService->getLayouts(Auth::id());
        return LayoutResource::collection($layouts);
    }

    /**
     * @param  StoreLayoutRequest  $request
     * @return Response
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function store(StoreLayoutRequest $request): Response
    {
        $data = $request->only(['text', 'items']);
        $this->layoutService->createLayout($data, Auth::id());
        return response(null, 201);
    }

    /**
     * @param  int $id layoutId
     * @return Response
     * @throws LayoutNotFoundException レイアウトが見つからない
     * 
     */
    public function show(int $id): JsonResource
    {
        $layout = $this->layoutService->getLayout($id);
        return  new LayoutResource($layout);
    }

    /**
     * @param  UpdateLayoutRequest  $request
     * @param  \App\Models\Layout  $layout
     * @return Response
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function update(UpdateLayoutRequest $request, Layout $layout): Response
    {
        $this->authorize('update', $layout);
        $data = $request->only(['text', 'items']);
        $this->layoutService->updateLayout($layout, $data);
        return response(null, 204);
    }

    /**
     * @param  \App\Models\Layout  $layout
     * @return Response
     */
    public function destroy(Layout $layout): Response
    {
        $this->authorize('delete', $layout);
        $this->layoutService->removeLayout($layout);
        return response(null, 204);
    }
}
