<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ItemTagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
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
