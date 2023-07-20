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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Log::info($request);

        $brand = Brand::where('brand_name', $request['itemDatas']['brandName'])->first(); 
        $category = Category::where('category_name', $request['itemDatas']['itemCategoryName'])->first(); 
        $subCategory = SubCategory::where('sub_category_name', $request['itemDatas']['subCategoryName'])->first(); 
        Log::info($request['itemDatas']['details']);

        $item = new Item;
        $item->item_name = $request['itemDatas']['itemName'];
        $item->brand_id = $brand->brand_id;
        $item->price = $request['itemDatas']['price'];
        $item->image_name = $request['itemDatas']['imageName'];
        $item->asin = $request['itemDatas']['asin'];
        $item->open_width = $request['itemDatas']['openWidth'];
        $item->open_depth = $request['itemDatas']['openDepth'];
        $item->open_height = $request['itemDatas']['openHeight'];
        $item->storage_width = $request['itemDatas']['storageWidth'];
        $item->storage_depth = $request['itemDatas']['storageDepth'];
        $item->storage_height = $request['itemDatas']['storageHeight'];
        $item->weight = $request['itemDatas']['weight'];
        $item->category_id = $category->category_id;
        $item->sub_category_id = $subCategory->sub_category_id;
        $item->save();

        // ColorモデルとTagモデルを使用して新しい色とタグを作成します
        foreach ($request['itemDatas']['colorTags'] as $colorName) {
            //colorテーブルからcolorNameを検索し、対応するIDを取得
            $color = ColorTag::where('color_name', $colorName)->first(); // 例: Colorモデルを使用して名前から色を検索

            if ($color) {
                $colorTag = new ColorTagRelation;
                $colorTag->color_tag_id = $color->color_tag_id; // 色のIDを設定
                $colorTag->item_id = $item->item_id; // 先ほど作成したアイテムのIDを設定
                $colorTag->save();
            }

        foreach ($request['itemDatas']['itemTags'] as $tagName) {
            //ItemTagテーブルからtagNameを検索し、対応するIDを取得
            $tag = ItemTag::where('item_tag_name', $tagName)->first(); // 例: ItemTagモデルを使用して名前から色を検索
            if ($tag) {
                $itemTag = new ItemTagRelation;
                $itemTag->item_tag_id = $tag->item_tag_id; // 色のIDを設定
                $itemTag->item_id = $item->item_id; // 先ほど作成したアイテムのIDを設定
                $itemTag->save();
            }
        }

        // ItemAbilityモデルを使用して新しいアイテム能力を作成します

        if (isset($request['itemDatas']['details']) && is_array($request['itemDatas']['details'])) {
            foreach ($request['itemDatas']['details'] as $attributeName => $attributeValue) {
                $itemAttribute = new ItemAttribute;
                $itemAttribute->item_id = $item->item_id;
                $itemAttribute->category_id = $category->category_id;
                $itemAttribute->attribute_name = $attributeName;
                $itemAttribute->attribute_value = $attributeValue;
                $itemAttribute->save();
        }}}



        // Item::create([
        //     'Item_name' => $request['itemDatas']['itemName'],
        //     'brand_id' => $request['itemDatas']['brandName'],
        //     'price' => $request['itemDatas']['price'],
        //     'image_name' => $request['itemDatas']['imageName'],
        //     'asin' => $request['itemDatas']['asin'],
        //     'open_width' => $request['itemDatas']['openWidth'],
        //     'open_depth' => $request['itemDatas']['openDepth'],
        //     'open_height' => $request['itemDatas']['openHeight'],
        //     'storage_width' => $request['itemDatas']['storageWidth'],
        //     'storage_depth' => $request['itemDatas']['storageDepth'],
        //     'storage_height' => $request['itemDatas']['storageHeight'],
        //     'weight' => $request['itemDatas']['weight'],
        //     'category_id' => $request['itemDatas']['itemCategoryName'],
        //     'sub_category_id' => $request['itemDatas']['subCategoryName'],
        //     'created_at' => now(),
        // ]);

        return response()->json(['message' => 'User created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
