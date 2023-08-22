<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Services\UserInventoryService;
use Illuminate\Support\Facades\Auth;

/**
 * ユーザーの持っている商品に関する操作を管理するコントローラークラスです。
 * このクラスではユーザーの持っている商品の取得、追加、削除などの操作を提供します。
 * すべてのメソッドは認証が必要です。
 */
class UserInventoryController extends Controller
{
    protected UserInventoryService $userInventoryService;

    public function __construct(UserInventoryService $userInventoryService)
    {
        $this->userInventoryService = $userInventoryService;
    }

    /**
     * ユーザーの持っている商品を取得
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $userInventories = $this->userInventoryService->getUserInventories(Auth::id());
        return response()->json($userInventories, 200);
    }

    /**
     * ユーザーの持っている商品に保存
     * @param  Item  $item
     * @return \Illuminate\Http\Response
     */
    public function store(Item $item): \Illuminate\Http\Response
    {
        $this->userInventoryService->addUserInventory(Auth::id(), $item->item_id);
        return response(null, 201);
    }

    /**
     * ユーザーの持っている商品から削除する
     * @param Item  $item
     * @return \Illuminate\Http\Response
     * @throws ItemNotInInventoryException 持っている商品に存在しない
     */
    public function destroy(Item $item): \Illuminate\Http\Response
    {
        $this->userInventoryService->removeUserInventory(Auth::id(), $item->item_id);
        return response(null, 204);
    }
}
