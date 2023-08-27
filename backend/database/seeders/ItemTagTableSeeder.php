<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * 商品タグを管理するitem_tagsテーブルの初期データを登録するシーダー
 */
class ItemTagTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()

    {
        $categories = [
            "軽量",
            "簡単設営",
            "韓国",
            "コンパクト",
            "無骨",
            "煙突穴",
            "難燃素材",
            "高遮光性",
        ];

        foreach ($categories as $category) {
            DB::table('item_tags')->insert([
                'item_tag_name' => $category,
            ]);
        }
    }
}
