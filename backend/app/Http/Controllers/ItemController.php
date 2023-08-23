<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemIndexRequest;
use App\Http\Requests\ItemRegisterRequest;
use App\Models\Item;
use App\Services\ItemService;

//商品に関するコントローラー
class ItemController extends Controller
{
    protected $itemService;

    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    // TODO 編集と削除の実装
    // itemDatas をitemDataに変更


    /**
     * 商品検索
     * @param  \Illuminate\Http\Request  $request categoryNameがあればカテゴリーで検索
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ItemIndexRequest $request): \Illuminate\Http\JsonResponse
    {
        $items = $this->itemService->getItems($request->categoryName);
        return response()->json($items, 200);
    }

    /**
     * 商品登録
     * @param  \Illuminate\Http\Request  $request 
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRegisterRequest $request): \Illuminate\Http\Response
    {
        $this->itemService->register($request->itemDatas);
        return response(null, 201);
    }

    /**
     * 商品詳細を取得
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $itemId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(\Illuminate\Http\Request $request, Item $item): \Illuminate\Http\JsonResponse
    {
        $userId = $request->attributes->get('user_id');;
        $itemData = $this->itemService->getItemDetails($item, $userId);
        $this->itemService->viewCountIncrement($item);
        return response()->json($itemData, 200);
    }

    /**
     * 商品詳細を更新
     * @param  \Illuminate\Http\Request  $request
     * @param  Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(ItemUpdateRequest $request, Item $item): \Illuminate\Http\Response
    {
        $this->itemService->updateItem($request->itemData, $item);
        return response(null, 200);
    }
}
