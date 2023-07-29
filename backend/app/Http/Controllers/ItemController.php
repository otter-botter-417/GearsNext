<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Item;
use App\Models\Brand;
use App\Models\Category;
use App\Models\SubCategory;

class ItemController extends Controller
{
    //商品に関するコントローラー

    /**
     * 商品検索
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // requestにcategorynameが入っていればカテゴリーで検索
        if ($request->has('categoryname')) {

            $category = Category::where('category_name', $request->get('categoryname'))->first();

            if (!$category) {
                return response()->json(['message' => 'カテゴリーが見つかりませんでした'], 404);
            }

            $items = Item::getItemDataWithRelations($category->items());
            return response()->json($items, 200);
        }

        //カテゴリーが入ってなければ全件渡す
        $allItems = Item::query();
        $items = Item::getItemDataWithRelations($allItems);
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
        // 既に登録されていればエラー ASINで検索
        $item = Item::where('asin', $request['itemDatas']['asin'])->first();
        if ($item) {
            return response()->json(['message' => '既に登録されています'], 409);
        }

        // requestからbrandName, itemCategoryName, subCategoryNameを取得して、brand, category, subCategoryを検索
        $brand = Brand::where('brand_name', $request['itemDatas']['brandName'])->first();
        $category = Category::where('category_name', $request['itemDatas']['itemCategoryName'])->first();
        $subCategory = SubCategory::where('sub_category_name', $request['itemDatas']['subCategoryName'])->first();

        if (!$brand || !$category || !$subCategory) {
            return response()->json(['message' => 'Brand, Category, or SubCategory not found'], 404);
        }

        $data = $request['itemDatas'];
        $data['brand_id'] = $brand->brand_id;
        $data['category_id'] = $category->category_id;
        $data['sub_category_id'] = $subCategory->sub_category_id;
        Item::createItemData($data);

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
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => '商品が見つかりませんでした'], 404);
        }

        $itemData = Item::getItemDataWithRelations($item);
        return response()->json($itemData, 200);
    }
}
