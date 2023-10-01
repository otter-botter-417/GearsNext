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
            'ドームテント', 'ティピーテント', 'パップテント', 'ワンポールテント', 'ロッジドームテント', 'ツールームテント',
            'ヘキサタープ', 'ウイングタープ', 'レクタタープ', 'スクリーンタープ', '多角形タープ',
            'ハイスタイルチェア', 'ロースタイルチェア', '座椅子', 'ベンチシート', 'リクライニングチェア', 'ハンモックチェア', 'スツール',
            'LEDランタン', '燃料式ランタン',
            'ハイテーブル', 'ローテーブル', 'ソロテーブル',
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
