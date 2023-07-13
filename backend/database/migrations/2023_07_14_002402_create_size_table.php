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
        Schema::create('size', function (Blueprint $table) {
            $table->increments('size_id')->primary();
            $table->foreign('item_id') // 外部キーとするカラム
              ->references('item_id') // 参照するテーブルのカラム
              ->on('item') // 参照するテーブル
              ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->froat('open_width',5,1);
            $table->froat('open_depth',5,1);
            $table->froat('open_height',5,1);
            $table->froat('storage_width',5,1);
            $table->froat('storage_depth',5,1);
            $table->froat('storage_height',5,1);
            $table->froat('weight',5,1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('size');
    }
};
