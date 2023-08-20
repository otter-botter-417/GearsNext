<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Layout;
use App\Models\TagPosition;

class LayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // レイアウトデータの作成
        $layout = Layout::create([
            'text' => 'サンプルテキスト',
            'user_id' => 1,
        ]);

        // レイアウトに関連する商品データの作成
        $items = [
            ['item_id' => 1, 'x_position' => 10, 'y_position' => 20],
        ];

        foreach ($items as $itemData) {
            TagPosition::create([
                'layout_id' => $layout->layout_id,
                'item_id' => $itemData['item_id'],
                'x_position' => $itemData['x_position'],
                'y_position' => $itemData['y_position']
            ]);
        }
    }
}
