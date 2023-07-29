<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\Log;


class ItemViewCountController extends Controller
{
    // 商品ページのview_countを更新する

    public function update($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => '商品が見つかりませんでした'], 404);
        }

        $item->viewCountIncrement();
        return response()->json(['message' => '閲覧回数を更新しました。'], 200);
    }
}
