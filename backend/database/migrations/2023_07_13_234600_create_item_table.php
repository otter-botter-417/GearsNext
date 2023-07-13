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
        Schema::create('item', function (Blueprint $table) {
            $table->increments('item_id'); // 主キーをuserIdに設定
            $table->string('Item_name',50);
            $table->unsignedInteger('brand_id'); // brand_idカラムを追加
            $table->foreign('brand_id') // 外部キーとするカラム
              ->references('brand_id') // 参照するテーブルのカラム
              ->on('brand') // 参照するテーブル
              ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->integer('price');
            $table->string('image_name',50);
            $table->string('asin',10);
            $table->unsignedInteger('size_id'); // brand_idカラムを追加
            $table->foreign('size_id') // 外部キーとするカラム
              ->references('size_id') // 参照するテーブルのカラム
              ->on('size') // 参照するテーブル
              ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->unsignedInteger('category_id'); // brand_idカラムを追加
            $table->foreign('category_id') // 外部キーとするカラム
                ->references('category_id') // 参照するテーブルのカラム
                ->on('category') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->unsignedInteger('sub_category_id'); // brand_idカラムを追加
                $table->foreign('sub_category_id') // 外部キーとするカラム
                ->references('category_id') // 参照するテーブルのカラム
                ->on('category') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->integer('favorite_count');
            $table->integer('view_count');
            $table->timestamps("");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item');
    }
};
