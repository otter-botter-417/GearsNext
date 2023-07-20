<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SubCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
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
