<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * レイアウトのコメントに関するファクトリクラスです。
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'layout_id' => Layout::inRandomOrder()->first()->layout_id,
            'user_id' => User::inRandomOrder()->first()->user_id,
            'content' => $this->faker->realText(50),
        ];
    }
}
