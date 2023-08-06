<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('item_id'); // 主キーをuserIdに設定
            $table->string('item_name', 50);
            $table->unsignedInteger('brand_id'); // brand_idカラムを追加
            $table->foreign('brand_id') // 外部キーとするカラム
                ->references('brand_id') // 参照するテーブルのカラム
                ->on('brands') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->integer('price');
            $table->string('image_name', 50);
            $table->string('asin', 10);
            $table->float('open_width', 5, 1);
            $table->float('open_depth', 5, 1);
            $table->float('open_height', 5, 1);
            $table->float('storage_width', 5, 1);
            $table->float('storage_depth', 5, 1);
            $table->float('storage_height', 5, 1);
            $table->float('weight', 5, 1);
            $table->unsignedInteger('category_id'); // brand_idカラムを追加
            $table->foreign('category_id') // 外部キーとするカラム
                ->references('category_id') // 参照するテーブルのカラム
                ->on('categories') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->unsignedInteger('sub_category_id'); // brand_idカラムを追加
            $table->foreign('sub_category_id') // 外部キーとするカラム
                ->references('sub_category_id') // 参照するテーブルのカラム
                ->on('sub_categories') // 参照するテーブル
                ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
            $table->integer('favorite_count')->default(0);
            $table->integer('view_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item');
    }
};
