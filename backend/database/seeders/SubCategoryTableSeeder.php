<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * サブカテゴリーデータを登録するシーダー
 */
class SubCategoryTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        $categories = [
            'ドームテント', 'ティピーテント', 'パップテント', 'ワンポールテント', 'ロッジテント', 'ツールームテント',
            'ヘキサタープ', 'ウイングタープ', 'レクタタープ', 'スクリーンタープ', '変則タープ',
            '折りたたみ式チェア', '組み立て式チェア', '座椅子', 'ベンチシート', 'リクライニングチェア', 'ハンモックチェア', 'スツール',
            'LEDランタン', 'オイルランタン', 'ガスランタン', 'ガソリンランタン',
            'ソロテーブル', 'ファミリーテーブル',
            '封筒型','マミー型',
            'インフレーターマット', 'エアーマット','クローズドセルマット',
            'ハイコット', 'ローコット', '2Way',
            '石油ストーブ', 'ガズストーブ', '電気ストーブ', '薪ストーブ',
        ];
            
        foreach ($categories as $category) {
            DB::table('sub_categories')->insert([
                'sub_category_name' => $category,
            ]);
        }
    }
}
