<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemIndexResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'item_id' => $this->item_id,
            'item_name' => $this->item_name,
            'price' => $this->price,
            'image_name' => $this->image_name,
            'asin' => $this->asin,
            'open_size' => [
                'open_width' => $this->open_width,
                'open_depth' => $this->open_depth,
                'open_height' => $this->open_height,
            ],
            'storage_size' => [
                'storage_width' => $this->storage_width,
                'storage_depth' => $this->storage_depth,
                'storage_height' => $this->storage_height,
            ],
            'weight' => $this->weight,
            'favorite_count' => $this->favorite_count,
            'view_count' => $this->view_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'brand_name' => $this->brand->brand_name,
            'category_name' => $this->category->category_name,
            'sub_category_name' => $this->subCategory->sub_category_name,
        ];
    }
}
