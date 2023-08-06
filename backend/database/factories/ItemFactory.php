<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * @var string
     */
    protected $model = Item::class;

    /**
     * @return array
     */
    public function definition()
    {
        return [
            'item_name' => $this->faker->word,
            'price' => $this->faker->numberBetween(100, 10000),
            'image_name' => $this->faker->lexify('??????????'),
            'asin' => $this->faker->unique()->bothify('???#######'),
            'open_width' => $this->faker->randomFloat(2, 10, 100),
            'open_depth' => $this->faker->randomFloat(2, 10, 100),
            'open_height' => $this->faker->randomFloat(2, 10, 100),
            'storage_width' => $this->faker->randomFloat(2, 10, 100),
            'storage_depth' => $this->faker->randomFloat(2, 10, 100),
            'storage_height' => $this->faker->randomFloat(2, 10, 100),
            'weight' => $this->faker->randomFloat(2, 0.5, 50),
            'brand_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7]),
            'category_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
            'sub_category_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6]),
        ];
    }
}
