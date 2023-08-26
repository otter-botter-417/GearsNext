<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'layout_id' => Layout::inRandomOrder()->first()->layout_id,
            'user_id' => User::inRandomOrder()->first()->user_id,
            'parent_id' => rand(0, 1) ? null : Comment::inRandomOrder()->first()?->comment_id,
            'content' => $this->faker->realText(50),
        ];
    }
}
