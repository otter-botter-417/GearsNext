<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * ユーザーデータを登録するシーダー
 */
class UsersTableSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'user_name' => "testName",
            'email' => "test@test.com",
            'password' => Hash::make('password'), // パスワードのハッシュ化
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
