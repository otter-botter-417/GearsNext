<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * カテゴリーを管理するcategoriesテーブルの初期データを登録するシーダークラス
 */
class CategoryTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        //frontend\components\atoms\itemAppend\SelectNames\CategoryNameList.tsx
        $categories = [
            "テント", "タープ", "チェア", "テーブル", "焚き火台", "ランタン、照明", "寝袋",
            "マット", "コット", "調理器具", "テントアクセサリー", "暖房器具", "クーラーボックス", "収納",
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'category_name' => $category,
            ]);
        }
    }
}
