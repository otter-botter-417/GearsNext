<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    public function run()
    {
        $parentIds = [];  // parent_idの候補となるIDを保存する配列

        for ($i = 0; $i < 50; $i++) {  // 50回ループしてCommentを生成
            $layout = Layout::inRandomOrder()->first();
            $user = User::inRandomOrder()->first();
            $parent_id = rand(0, 1) ? null : (isset($parentIds[array_rand($parentIds)]) ? $parentIds[array_rand($parentIds)] : null);

            $comment = Comment::create([
                'layout_id' => $layout->layout_id,
                'user_id' => $user->user_id,
                'parent_id' => $parent_id,
                'content' => 'テスト内容'  // またはFakerを使用
            ]);

            $parentIds[] = $comment->id;  // 生成されたCommentのIDを配列に追加
        }
    }
}
