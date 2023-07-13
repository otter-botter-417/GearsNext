<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('color_tag', function (Blueprint $table) {
            $table->increments('color_tag_id')->primary();
            $table->foreign('item_id') // 外部キーとするカラム
              ->references('item_id') // 参照するテーブルのカラム
              ->on('item') // 参照するテーブル
              ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->string('color_name',50);
            // 外部キー制約を設定
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('color_tag');
    }
};
