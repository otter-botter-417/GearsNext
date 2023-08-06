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

    /**
     * 商品検索
     * @param  \Illuminate\Http\Request  $request categorynameがあればカテゴリーで検索
     * @return \Illuminate\Http\Response
     */
    public function index(ItemIndexRequest $request)
    {
        $items = $this->itemService->getItems($request);
        return response()->json($items, 200);
    }

    /**
     * 商品登録
     * @param  \Illuminate\Http\Request  $request 
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRegisterRequest $request)
    {
        $this->itemService->register($request);
        return response()->json(['message' => '商品登録が完了しました'], 201);
    }

    /**
     * 商品詳細を取得
     * @param  int  $itemId
     * @return \Illuminate\Http\Response
     */
    public function show($itemId)
    {
        $itemData = $this->itemService->getItemDetails($itemId);
        return response()->json($itemData, 200);
    }
}
