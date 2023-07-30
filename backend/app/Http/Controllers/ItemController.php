<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Item;

class ItemController extends Controller
{
    //商品に関するコントローラー

    /**
     * 商品検索
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = Item::getItems($request);
        return response()->json($items, 200);
    }

    /**
     * 商品登録
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Item::register($request);
        return response()->json(['message' => '商品登録が完了しました'], 201);
    }

    /**
     * 商品詳細を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $itemData = Item::getItemDetails($id);
        return response()->json($itemData, 200);
    }
}
