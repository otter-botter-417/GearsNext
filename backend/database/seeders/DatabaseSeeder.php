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

        // コメントのIDを保存する配列
        $commentIds = [];

        // CommentFactoryを用意
        $commentFactory = \App\Models\Comment::factory();

        // 50回ループしてコメントを作成
        for ($i = 0; $i < 3; $i++) {
            // 最初のコメントは親がいない（parent_id が null）
            if ($i === 0) {
                $parentId = null;
            } else {
                // 30% の確率で親コメントがいない（parent_id が null）
                $parentId = rand(0, 100) < 70 ? null : $commentIds[array_rand($commentIds)];
            }

            // コメントを作成
            $newComment = $commentFactory->create(['parent_id' => $parentId]);

            // 新しいコメントのIDを配列に保存
            $commentIds[] = $newComment->comment_id;
        }
    }
}
