<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\Log;


class ItemViewCountController extends Controller
{
    //
    public function update($id)
    {
        //商品ページ用　個別の商品データを受け取ったidで検索して返す
        Log::info("カウントした");
        $item = Item::find($id);
        if ($item) {
            // +1する処理
            $item->increment('view_count');
            $item->save();
        }
        

        return response()->json(['message' => 'view_count update successfully']);
        }
}
