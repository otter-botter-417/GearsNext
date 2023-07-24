<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'Item_name' => "ソロベースEX",
            'brand_id' => 1,
            'price' => 25581,
            'image_name' => "solobase_ex",
            'asin' => "B0B3W5TG2Y",
            'open_width' => 360,
            'open_depth' => 190,
            'open_height' => 110,
            'storage_width' => 47,
            'storage_depth' => 24,
            'storage_height' => 24,
            'weight' => 5.2,
            'category_id' => 1,
            'sub_category_id' => 3,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
