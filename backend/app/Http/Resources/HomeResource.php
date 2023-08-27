<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HomeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'topViewedItems' => collect($this->resource['topViewedItems'])->map(function ($item) {
                return [
                    'item_id' => $item->item_id,
                    'item_name' => $item->item_name,
                    'image_name' => $item->image_name,
                    'favorite_count' => $item->favorite_count,
                    'view_count' => $item->view_count,
                ];
            }),

            'topFavoriteItems' => collect($this->resource['topFavoriteItems'])->map(function ($item) {
                return [
                    'item_id' => $item->item_id,
                    'item_name' => $item->item_name,
                    'image_name' => $item->image_name,
                    'favorite_count' => $item->favorite_count,
                    'view_count' => $item->view_count,
                ];
            }),

            'newlyArrivedItems' => collect($this->resource['newlyArrivedItems'])->map(function ($item) {
                return [
                    'item_id' => $item->item_id,
                    'item_name' => $item->item_name,
                    'image_name' => $item->image_name,
                    'favorite_count' => $item->favorite_count,
                    'view_count' => $item->view_count,
                ];
            }),

            'topViewedLayouts' => collect($this->resource['topViewedLayouts'])->map(function ($item) {
                return [
                    'layout_id' => $item->layout_id,
                    'favorite_count' => $item->favorite_count,
                    'view_count' => $item->view_count,
                    'user_name' => $item->users->user_name,
                ];
            }),

            'topFavoriteLayouts' => collect($this->resource['topFavoriteLayouts'])->map(function ($item) {
                return [
                    'layout_id' => $item->layout_id,
                    'favorite_count' => $item->favorite_count,
                    'view_count' => $item->view_count,
                    'user_name' => $item->users->user_name,
                ];
            }),

            'newlyArrivedLayouts' => collect($this->resource['newlyArrivedLayouts'])->map(function ($item) {
                return [
                    'layout_id' => $item->layout_id,
                    'favorite_count' => $item->favorite_count,
                    'view_count' => $item->view_count,
                    'user_name' => $item->users->user_name,
                ];
            }),
        ];
    }
}
