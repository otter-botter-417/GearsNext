<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemIndexRequest;
use App\Http\Requests\ItemRegisterRequest;
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


    /**
     * 商品検索
     * @param  \Illuminate\Http\Request  $request categorynameがあればカテゴリーで検索
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ItemIndexRequest $request): \Illuminate\Http\JsonResponse
    {
        $items = $this->itemService->getItems($request->categoryname);
        return response()->json($items, 200);
    }

    /**
     * 商品登録
     * @param  \Illuminate\Http\Request  $request 
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ItemRegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->itemService->register($request->itemDatas);
        return response()->json(['message' => '商品登録が完了しました'], 201);
    }

    /**
     * 商品詳細を取得
     * @param  int  $itemId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(\Illuminate\Http\Request $request, $itemId): \Illuminate\Http\JsonResponse
    {
        $userId = $request->attributes->get('user_id');;
        $itemData = $this->itemService->getItemDetails($itemId, $userId);
        $this->itemService->viewCountIncrement($itemId);
        return response()->json($itemData, 200);
    }
}
