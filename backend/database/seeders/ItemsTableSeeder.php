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
            'Item_name' => "test",
            'brand_id' => 1,
            'price' => 30000,
            'image_name' => "solobase",
            'asin' => "ASDKASDAKA",
            'open_width' => 120,
            'open_depth' => 120,
            'open_height' => 120,
            'storage_width' => 120,
            'storage_depth' => 120,
            'storage_height' => 120,
            'weight' => 5.2,
            'category_id' => 1,
            'sub_category_id' => 2,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
