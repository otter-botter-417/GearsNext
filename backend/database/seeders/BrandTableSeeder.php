<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class BrandTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
        "ogawa",
        "Coleman",
        "snow peak",
        "WIWO",
        "BUNDOK",
        "OneTigris",
        "WAQ"];
            
            foreach ($categories as $category) {
                DB::table('brands')->insert([
                    'brand_name' => $category,
                ]);
            }
    }
}
