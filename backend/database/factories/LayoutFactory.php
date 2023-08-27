<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Layout;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * レイアウトに関するファクトリクラスです。
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Layout>
 */
class LayoutFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'text' => $this->faker->realText(50),
            'user_id' => User::inRandomOrder()->first()->user_id,
            'favorite_count' => $this->faker->numberBetween(0, 1000),
            'view_count' => $this->faker->numberBetween(0, 5000),
        ];
    }

    /**
     * リレーションを考慮したデータを作成
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function createWithRelations()
    {
        return $this->afterCreating(function (Layout $layout) {
            // Tagからランダムに1個のIDを取得
            $randomItem = Item::inRandomOrder()->first();
            if ($randomItem) {
                $items = [
                    [
                        'item_id' => $randomItem->item_id,
                        'x_position' => $this->faker->randomFloat(1, 10, 100),
                        'y_position' => $this->faker->randomFloat(1, 10, 100),
                    ]
                ];
                // 新しく作成されたLayoutに対して、取得したItemのIDを紐付ける
                $layout->tagPositions()->createMany($items);
                $layout->items()->attach($randomItem->item_id);
            }
        })->create();
    }
}
