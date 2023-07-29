<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Item;
use App\Models\ColorTagRelation;
use App\Models\ItemTagRelation;
use App\Models\ItemAttribute;
use App\Models\ColorTag;
use App\Models\ItemTag;
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
            // カテゴリーを検索
            $category = Category::where('category_name', $request->get('categoryname'))->first();

            // カテゴリーが見つかれば、カテゴリーに関連するアイテムを取得
            if ($category) {
                // カテゴリにー関連するアイテムを取得し、関連データも一緒にロード
                $items = Item::getItemDataWithRelations($category->items());
                return response()->json($items, 200);
            } elseif (!$category) {
                return response()->json(['message' => 'カテゴリーが見つかりませんでした']);
            }
        }
        //カテゴリーが入ってなければ全件渡す
        else {
            $allItems = Item::query();
            // 関連データも一緒にロード
            $items = Item::getItemDataWithRelations($allItems);

            return response()->json($items, 200);
        }
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
            return response()->json(['message' => '既に登録されています'], 400);
        }

        // requestからbrandName, itemCategoryName, subCategoryNameを取得して、brand, category, subCategoryを検索
        $brand = Brand::where('brand_name', $request['itemDatas']['brandName'])->first();
        $category = Category::where('category_name', $request['itemDatas']['itemCategoryName'])->first();
        $subCategory = SubCategory::where('sub_category_name', $request['itemDatas']['subCategoryName'])->first();

        // brand, category, subCategoryが存在するか確認
        if (!$brand || !$category || !$subCategory) {
            return response()->json(['message' => 'Brand, Category, or SubCategory not found'], 404);
        }

        // requestからitemDatasを取得して、itemを作成
        $data = $request['itemDatas'];
        $data['brand_id'] = $brand->brand_id;
        $data['category_id'] = $category->category_id;
        $data['sub_category_id'] = $subCategory->sub_category_id;

        Item::createItemData($data);

        return response()->json(['message' => '商品登録が完了しました']);
    }

    /**
     * 商品詳細を取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Itemテーブルからitem_idを取得
        $item = Item::find($id);

        // itemがみつかれば、商品詳細を取得
        if ($item) {
            $itemData = Item::getItemDataWithRelations($item);
            return response()->json($itemData, 200);
        } else {
            return response()->json(['message' => '商品が見つかりませんでした']);
        }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
