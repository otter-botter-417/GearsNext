<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            //frontend\components\atoms\itemAppend\SelectNames\CategoryNameList.tsx
            $categories = ["テント","タープ","チェア","テーブル","焚き火台","ランタン、照明","寝袋",
            "マット","コット","調理器具","テントアクセサリー","暖房器具","クーラーボックス","収納",];
            
            foreach ($categories as $category) {
                DB::table('categorys')->insert([
                    'category_name' => $category,
                ]);
            }
        
    }
}
