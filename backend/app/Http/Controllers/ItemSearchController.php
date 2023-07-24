<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;


class ItemSearchController extends Controller
{
    //
    public function index(Request $request)
    {
        //
        $query = Item::query();

        // 商品名での検索
        if ($request->has('category_id')) {
            $category = Category::where('category_name', $request->get('product_name'))->first(); 

            $query->where('category_id',$category);

        $items = $query->get();
        
        return response()->json($items, 200);
    
    }}
}
