<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * サブカテゴリーデータを登録するシーダー
 */
class SubCategoryTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $categories = [
            "ドームテント",
            "ティピーテント",
            "パップテント",
            "ワンポールテント",
            "ロッジドームテント",
            "ツールームテント"
        ];
            
        foreach ($categories as $category) {
            DB::table('sub_categories')->insert([
                'sub_category_name' => $category,
            ]);
        }
    }
}
