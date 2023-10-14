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
        $brands = [
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
            'ノルディスク',
            'テンマクデザイン',
            'DOD',
            'SoomLoom',
            'TOMOUNT',
            'FIELDOOR',
            'MURACO',
            'MSR',
            'QUICKCAMP',
            'ロゴス',
            'LOGOS',
            'MINIMAL WORKS',
            'THE NORTH FACE',
            'mont-bell',
            'DD Hammocks',
        ];

        // ブランドリストをアルファベット順にソート
        sort($brands);

        foreach ($brands as $brand) {
            DB::table('brands')->insert([
                'brand_name' => $brand,
            ]);
        }
    }
}
