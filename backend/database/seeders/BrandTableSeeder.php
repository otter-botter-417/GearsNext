<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * ブランドを管理するbrandsテーブルの初期データを登録するシーダークラス
 */
class BrandTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $categories = [
            "ogawa",
            "Coleman",
            "snow peak",
            "WIWO",
            "BUNDOK",
            "OneTigris",
            "WAQ",
            "AO Coolers",
            "UNIFLAME",
            "CAPTAIN STAG",
            'ALPACA',
            'NANGA',



        ];

        foreach ($categories as $category) {
            DB::table('brands')->insert([
                'brand_name' => $category,
            ]);
        }
    }
}
