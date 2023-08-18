<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use App\Services\LayoutService;
use App\Http\Requests\StoreLayoutRequest;
use App\Http\Requests\UpdateLayoutRequest;
use App\Http\Resources\LayoutResource;
use Illuminate\Support\Facades\Auth;

/**
 * レイアウトに関する操作を管理するコントローラークラスです。
 * このクラスではレイアウトの作成、更新、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 */
class LayoutController extends Controller
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
        $layouts = $this->layoutService->getLayouts(Auth::id());
        return LayoutResource::collection($layouts);
    }

    /**
     * @param  \App\Http\Requests\StoreLayoutRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLayoutRequest $request)
    {
        $data = $request->only(['text', 'itemIds']);
        $this->layoutService->createLayout($data, Auth::id());
        return response()->json(['message' => 'レイアウト登録が完了しました。'], 201);
    }

    /**
     * @param  int  $id layoutId
     * @return \Illuminate\Http\Response
     * @throws LayoutNotFoundException
     */
    public function show(int $id)
    {
        $layout = $this->layoutService->getLayout($id);
        return  new LayoutResource($layout);
    }

    /**
     * @param  \App\Http\Requests\UpdateLayoutRequest  $request
     * @param  \App\Models\Layout  $layout
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLayoutRequest $request, Layout $layout)
    {
        $this->authorize('update', $layout);
        $data = $request->only(['text', 'itemIds']);
        $this->layoutService->updateLayout($layout, $data);
        return response()->json(['message' => 'レイアウト更新が完了しました。'], 200);
    }

    /**
     * @param  \App\Models\Layout  $layout
     * @return \Illuminate\Http\Response
     */
    public function destroy(Layout $layout)
    {
        $this->authorize('delete', $layout);
        $this->layoutService->removeLayout($layout);
        return response(null, 204);
    }
}
