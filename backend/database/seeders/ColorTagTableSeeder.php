<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * カラータグを管理するcolor_tagsテーブルの初期データを登録するシーダークラス
 */
class ColorTagTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $categories = [
            "オリーブ",
            "レッド",
            "ブラック",
            "ホワイト",
            "ベージュ",
            "ブラウン",
        ];

        foreach ($categories as $category) {
            DB::table('color_tags')->insert([
                'color_tag_name' => $category,
            ]);
        }
    }
}
