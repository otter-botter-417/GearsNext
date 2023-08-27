<?php

namespace Database\Seeders;

use App\Models\ColorTag;
use App\Models\Item;
use App\Models\ItemTag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

/**
 * itemsテーブルの初期データを登録するシーダークラス
 */
class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item = Item::create([
            'Item_name' => "ソロベースEX",
            'brand_id' => 1,
            'price' => 25581,
            'image_name' => "solobase_ex",
            'asin' => "B0B3W5TG2Y",
            'open_width' => 360,
            'open_depth' => 190,
            'open_height' => 110,
            'storage_width' => 47,
            'storage_depth' => 24,
            'storage_height' => 24,
            'weight' => 5.2,
            'category_id' => 1,
            'sub_category_id' => 3,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $colorTagIds = ColorTag::create(['color_tag_name' => "オリーブ"])->color_tag_id;
        $itemTagIds = ItemTag::create(['item_tag_name' => "無骨"])->item_tag_id;
        $attributesData = [
            ['category_id' => $item->category_id, 'attribute_name' => "inner_tent", 'attribute_value' => "付属"],
            ['category_id' => $item->category_id, 'attribute_name' => "grand_sheet", 'attribute_value' => "無し"],
            ['category_id' => $item->category_id, 'attribute_name' => "fabrics", 'attribute_value' => "TC"],
        ];
        // 新しく作成されたItemに対して、取得したColorTagのIDを紐付ける
        $item->colorTags()->sync($colorTagIds);
        $item->itemTags()->sync($itemTagIds);
        $item->itemAttributes()->createMany($attributesData);
    }
}
