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
            $table->increments('item_id')->primary(); // 主キーをuserIdに設定
            $table->string('Item_name',50);
            $table->foreign('brand_id') // 外部キーとするカラム
              ->references('brand_id') // 参照するテーブルのカラム
              ->on('brand') // 参照するテーブル
              ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->integer('price',8);
            $table->string('image_name',10);
            $table->string('asin',10);
            $table->string('Item_name',50);
            $table->foreign('size_id') // 外部キーとするカラム
              ->references('item_id') // 参照するテーブルのカラム
              ->on('size') // 参照するテーブル
              ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->foreign('tag_id') // 外部キーとするカラム
                ->references('item_id') // 参照するテーブルのカラム
                ->on('tag') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->foreign('color_tag_id') // 外部キーとするカラム
                ->references('item_id') // 参照するテーブルのカラム
                ->on('color_tag') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->foreign('category_id') // 外部キーとするカラム
                ->references('category_id') // 参照するテーブルのカラム
                ->on('category') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除


            $table->timestamps();
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
