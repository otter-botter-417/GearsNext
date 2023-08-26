<?php

namespace Database\Factories;

use App\Models\ColorTag;
use App\Models\Item;
use App\Models\ItemAttribute;
use App\Models\ItemTag;
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
            'item_name' => $this->faker->realText(10),
            'price' => $this->faker->numberBetween(100, 10000),
            'image_name' => $this->faker->regexify('[A-Za-z0-9]{10}'),
            'asin' => $this->faker->unique()->bothify('???#######'),
            'open_width' => $this->faker->randomFloat(1, 10, 100),
            'open_depth' => $this->faker->randomFloat(1, 10, 100),
            'open_height' => $this->faker->randomFloat(1, 10, 100),
            'storage_width' => $this->faker->randomFloat(1, 10, 100),
            'storage_depth' => $this->faker->randomFloat(1, 10, 100),
            'storage_height' => $this->faker->randomFloat(1, 10, 100),
            'weight' => $this->faker->randomFloat(1, 0.5, 50),
            'brand_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7]),
            'category_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
            'sub_category_id' => $this->faker->randomElement([1, 2, 3, 4, 5, 6]),
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
        return $this->afterCreating(function (Item $item) {
            // Tagからランダムに1～3個のIDを取得
            $colorTagIds = ColorTag::inRandomOrder()->take(rand(1, 3))->pluck('color_tag_id');
            $itemTagIds = ItemTag::inRandomOrder()->take(rand(1, 3))->pluck('item_tag_id');

            // 新しく作成されたItemに対して、取得したColorTagのIDを紐付ける
            $item->colorTags()->sync($colorTagIds);
            $item->itemTags()->sync($itemTagIds);
        })->create();
        // ItemAttributeの関連付け
        // $item->itemAttributes()->createMany(ItemAttribute::factory()->count(5)->make()->toArray());
        // })->create();
    }
}
