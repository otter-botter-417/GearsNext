<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

/**
 * データベースの初期データを登録するシーダークラス
 */
class DatabaseSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            CategoryTableSeeder::class,
            SubCategoryTableSeeder::class,
            BrandTableSeeder::class,
            ItemTagTableSeeder::class,
            ColorTagTableSeeder::class,
            ItemsTableSeeder::class,
            LayoutSeeder::class,
            CommentTableSeeder::class,
        ]);
        \App\Models\User::factory(3)->create();
        $itemFactory = \App\Models\Item::factory();
        for ($i = 0; $i < 5; $i++) {
            $itemFactory->createWithRelations();
        };
        $layoutFactory = \App\Models\Layout::factory();
        for ($i = 0; $i < 3; $i++) {
            $layoutFactory->createWithRelations();
        };
    }
}
