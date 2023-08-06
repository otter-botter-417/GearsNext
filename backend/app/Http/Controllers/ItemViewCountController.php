<?php

namespace App\Http\Controllers;

// 商品ページのview_countを更新する
class ItemViewCountController extends Controller
{
    // TODO リポジトリとサービスの実装？　１メソッドしかないので移動も考える　リポジトリとサービスの実装も考える

    public function update($item_id)
    {
        // Item::viewCountIncrement($id);
        return response()->json(['message' => '閲覧回数を更新しました。'], 200);
    }
}
