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
        // idからitemを検索して、itemが存在すればview_countを+1する
        $item = Item::find($id);
        if ($item) {
            $item->viewCountIncrement();
        }

        return response()->json(['message' => '閲覧回数を更新しました。']);
    }
}
