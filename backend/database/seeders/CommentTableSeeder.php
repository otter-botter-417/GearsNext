<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

/**
 * commentsテーブルの初期データを登録するシーダークラス
 */
class CommentTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('ja_JP');
        for ($i = 0; $i < 50; $i++) {  // 50回ループしてCommentを生成
            $layout = Layout::inRandomOrder()->first();
            $user = User::inRandomOrder()->first();

            $sameLayoutCommentIds = Comment::where('layout_id', $layout->layout_id)->pluck('comment_id')->toArray();
            // parent_idは、同じlayout_idのコメントの中からランダムに選ばれるか、nullになる
            $parent_id = null;
            
            if(rand(0, 1) && !empty($sameLayoutCommentIds)) {
                $randomIndex = array_rand($sameLayoutCommentIds);
                $parent_id = $sameLayoutCommentIds[$randomIndex];
            }
            
            $comment = Comment::create([
                'layout_id' => $layout->layout_id,
                'user_id' => $user->user_id,
                'parent_id' => $parent_id,
                'content' => $faker->sentence(mt_rand(20, 50)),   // またはFakerを使用
            ]);
        }
    }
}
