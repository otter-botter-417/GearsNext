<?php

namespace App\Http\Controllers;

// 商品ページのview_countを更新する
class ItemViewCountController extends Controller
{
    public function update($item_id)
    {
        // Item::viewCountIncrement($id);
        return response()->json(['message' => '閲覧回数を更新しました。'], 200);
    }
}
