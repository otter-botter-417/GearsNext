<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Item;
<<<<<<< HEAD
use App\Models\ColorTagRelation;
use App\Models\ItemTagRelation;
use App\Models\ItemAttribute;
use App\Models\ColorTag;
use App\Models\ItemTag;
use App\Models\Brand;
use App\Models\Category;
use App\Models\SubCategory;
=======


>>>>>>> 8dd274d5c53b4277fee9e1667d2fdc5d6fbebb5a

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //商品検索
    public function index(Request $request)
    {
        //
<<<<<<< HEAD
        Log::info($request);
        $query = Item::query();

        // 商品名での検索
        if ($request->has('categoryname')) {
            $category = Category::where('category_name', $request->get('categoryname'))->first(); 

            $query->where('category_id',$category->category_id);
=======
        $query = Item::query();

        // 商品名での検索
        if ($request->has('category_id')) {
            $productName = $request->get('product_name');
            $query->where('name', 'like', '%' . $productName . '%');
>>>>>>> 8dd274d5c53b4277fee9e1667d2fdc5d6fbebb5a

        $items = $query->get();
        
        return response()->json($items, 200);
    
<<<<<<< HEAD
    }}
=======
    }
>>>>>>> 8dd274d5c53b4277fee9e1667d2fdc5d6fbebb5a
    
    

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
        Item::create([
            'Item_name' => $request['Item_name'],
            'brand_id' => $request['brand_id'],
            'price' => $request['price'],
            'image_name' => $request['image_name'],
            'asin' => $request['asin'],
            'size_id' => $request['size_id'],
            'category_id' => $request['category_id'],
            'sub_category_id' => $request['sub_category_id'],
            'created_at' => now(),
        ]);

        return response()->json(['message' => 'Item created successfully']);
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
