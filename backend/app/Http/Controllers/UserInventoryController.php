<?php

namespace App\Http\Controllers;

use App\Http\Requests\InventoryRequest;
use App\Models\User;
use App\Services\UserInventoryService;

// 持っている物
class UserInventoryController extends Controller
{
    protected UserInventoryService $userInventoryService;

    public function __construct(UserInventoryService $userInventoryService)
    {
        $this->userInventoryService = $userInventoryService;
    }

    /**
     * ユーザーの持っている商品を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): \Illuminate\Http\JsonResponse
    {
        $userInventorys = $this->userInventoryService->getUserInventories($id);
        return response()->json($userInventorys, 200);
    }

    /**
     * UserInventoryテーブルに保存
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(InventoryRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->userInventoryService->addUserInventory($request->userFirebaseId, $request->itemId);
        return response()->json(['message' => '持っている商品に登録しました。'], 201);
    }

    /**
     * UserInventoryテーブルから削除する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(InventoryRequest $request): \Illuminate\Http\JsonResponse
    {
        $this->userInventoryService->removeUserInventory($request->userFirebaseId, $request->itemId);
        return response()->json(['message' => '持っている商品から削除しました。'], 200);
    }
}
