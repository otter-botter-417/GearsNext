<?php

namespace App\Http\Controllers;

class ItemViewCountController extends Controller
{
    // 商品ページのview_countを更新する

    public function update($item_id)
    {
        // Item::viewCountIncrement($id);
        return response()->json(['message' => '閲覧回数を更新しました。'], 200);
    }
}
