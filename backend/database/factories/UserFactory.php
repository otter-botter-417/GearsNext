<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * ユーザーに関するファクトリクラスです。
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_name' => fake()->unique()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => $this->faker->lexify('??????????'),
        ];
    }
}
