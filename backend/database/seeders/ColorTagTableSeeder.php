<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ColorTagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
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
                    'color_name' => $category,
                ]);
            }
    }
}
