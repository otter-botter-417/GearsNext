<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Domain\Item\ItemService;
use App\Domain\Item\ItemCreateService;
use App\Http\Requests\ItemIndexRequest;
use App\Http\Requests\ItemRegisterRequest;
use App\Http\Resources\ItemShowResource;
use \Illuminate\Http\Request;
use \Illuminate\Http\Response;
use \Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * 商品に関する操作を管理するコントローラークラスです。
 * このクラスでは商品の検索、登録、取得、更新、削除などの操作を提供します。
 * 認証は不要です。
 */
class ItemController extends Controller
{
    protected $itemService;
    protected $itemCreateService;

    public function __construct(ItemService $itemService, ItemCreateService $itemCreateService)
    {
        $this->itemService = $itemService;
        $this->itemCreateService = $itemCreateService;
    }

    /**
     * 商品検索
     * @param  Request  $request category_nameがあればカテゴリーで検索
     * @return JsonResponse
     */
    public function index(ItemIndexRequest $request): ResourceCollection
    {
        $items = $this->itemService->getItems($request->category_name);
        return ItemShowResource::collection($items);
    }

    /**
     * 商品登録
     * @param  Request  $request 
     * @return Response
     */
    public function store(ItemRegisterRequest $request): Response
    {
        $this->itemCreateService->register($request->itemData);
        return response(null, 201);
    }

    /**
     * 商品詳細を取得
     * @param  Request  $request
     * @param  Item  $item
     * @return ItemShowResource
     */
    public function show(Request $request, Item $item): ItemShowResource
    {
        $userId = $request->attributes->get('user_id');;
        $itemData = $this->itemService->getItemDetail($item, $userId);
        return  new ItemShowResource($itemData);
    }

    /**
     * 商品情報を更新
     * @param  Request  $request
     * @param  Item  $item
     * @return Response
     */
    public function update(ItemRegisterRequest $request, Item $item): Response
    {
        $this->itemCreateService->updateItemData($request->itemData, $item);
        return response(null, 204);
    }

    /**
     * 商品を削除
     * @param  Item  $item
     * @return Response
     */
    public function destroy(Item $item): Response
    {
        $this->itemService->deleteItem($item);
        return response(null, 204);
    }
}
