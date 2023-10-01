<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ホーム画面の情報を提供するリソースクラスです。
 * このクラスではホーム画面の情報をJSON形式で返却します。
 * ホーム画面の情報は以下の通りです。
 * ・お気に入り商品の上位5件
 * ・閲覧数の多い商品の上位5件
 * ・新着商品の上位5件
 * ・お気に入りレイアウトの上位5件
 * ・閲覧数の多いレイアウトの上位5件
 * ・新着レイアウトの上位5件
 * 
 *  HomeControllerのindexメソッドで使用します。
 */
class HomeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'topViewedItems' => collect($this->resource['topViewedItems'])->map(function ($item) {
                return [
                    'itemId' => $item->item_id,
                    'itemName' => $item->item_name,
                    'imageName' => $item->image_url,
                    'brandName' => $item->brand->brand_name,
                    'favoriteCount' => $item->favorite_count,
                    'viewCount' => $item->view_count,
                ];
            }),

            'topFavoriteItems' => collect($this->resource['topFavoriteItems'])->map(function ($item) {
                return [
                    'itemId' => $item->item_id,
                    'itemName' => $item->item_name,
                    'imageName' => $item->image_url,
                    'brandName' => $item->brand->brand_name,
                    'favoriteCount' => $item->favorite_count,
                    'viewCount' => $item->view_count,
                ];
            }),

            'newlyArrivedItems' => collect($this->resource['newlyArrivedItems'])->map(function ($item) {
                return [
                    'itemId' => $item->item_id,
                    'itemName' => $item->item_name,
                    'imageName' => $item->image_url,
                    'brandName' => $item->brand->brand_name,
                    'favoriteCount' => $item->favorite_count,
                    'viewCount' => $item->view_count,
                ];
            }),

            'topViewedLayouts' => collect($this->resource['topViewedLayouts'])->map(function ($item) {
                return [
                    'layoutId' => $item->layout_id,
                    'favoriteCount' => $item->favorite_count,
                    'imageName' => config('constants.LAYOUT_IMAGE_BASE_URL') . $item->layout_id . '.jpg',
                    'viewCount' => $item->view_count,
                    'userName' => $item->users->user_name,
                ];
            }),

            'topFavoriteLayouts' => collect($this->resource['topFavoriteLayouts'])->map(function ($item) {
                return [
                    'layoutId' => $item->layout_id,
                    'favoriteCount' => $item->favorite_count,
                    'imageName' => config('constants.LAYOUT_IMAGE_BASE_URL') . $item->layout_id . '.jpg',
                    'viewCount' => $item->view_count,
                    'userName' => $item->users->user_name,
                ];
            }),

            'newlyArrivedLayouts' => collect($this->resource['newlyArrivedLayouts'])->map(function ($item) {
                return [
                    'layoutId' => $item->layout_id,
                    'favoriteCount' => $item->favorite_count,
                    'imageName' => config('constants.LAYOUT_IMAGE_BASE_URL') . $item->layout_id . '.jpg',
                    'viewCount' => $item->view_count,
                    'userName' => $item->users->user_name,
                ];
            }),
        ];
    }
}
