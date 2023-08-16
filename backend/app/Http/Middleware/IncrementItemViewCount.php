<?php

namespace App\Http\Middleware;

use App\Models\Item;
use Closure;
use Illuminate\Http\Request;

class IncrementItemViewCount
{
    /**
     * 商品の閲覧数をインクリメントする
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // URLから商品IDを取得
        $itemId = $request->route('itemId');

        // 商品IDが存在する場合、閲覧数をインクリメント
        if ($itemId) {
            $item = Item::find($itemId);
            if ($item) {
                $item->increment('view_count');
            }
        }

        return $response;
    }
}
