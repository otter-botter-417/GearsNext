<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\SubCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'item_name' => $this->faker->word,
            'price' => $this->faker->numberBetween(100, 10000),
            'image_name' => $this->faker->image('public/storage/images', 640, 480, null, false),
            'asin' => $this->faker->unique()->bothify('???-####-###?'),
            'open_width' => $this->faker->randomFloat(2, 10, 100),
            'open_depth' => $this->faker->randomFloat(2, 10, 100),
            'open_height' => $this->faker->randomFloat(2, 10, 100),
            'storage_width' => $this->faker->randomFloat(2, 10, 100),
            'storage_depth' => $this->faker->randomFloat(2, 10, 100),
            'storage_height' => $this->faker->randomFloat(2, 10, 100),
            'weight' => $this->faker->randomFloat(2, 0.5, 50),
            'brand_id' => Brand::factory(),
            'category_id' => Category::factory(),
            'sub_category_id' => SubCategory::factory(),
        ];
    }
}
