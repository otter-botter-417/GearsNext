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
    Schema::create('item_attributes', function (Blueprint $table) {
      $table->increments('item_attributes_id');
      $table->unsignedInteger('item_id'); // brand_idカラムを追加
      $table->foreign('item_id') // 外部キーとするカラム
        ->references('item_id') // 参照するテーブルのカラム
        ->on('items') // 参照するテーブル
        ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
      $table->unsignedInteger('category_id'); // brand_idカラムを追加
      $table->foreign('category_id') // 外部キーとするカラム
        ->references('category_id') // 参照するテーブルのカラム
        ->on('categories') // 参照するテーブル
        ->onDelete('cascade');  // 参照先のレコードが削除されたとき、このテーブルのレコードも一緒に削除
      $table->string('attribute_name', 50);
      $table->string('attribute_value', 50);
      $table->unique(['item_id', 'attribute_name']); // user_idとitem_idの組み合わせにユニーク制約を追加

    });
  }

  /**
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('item_attributes');
  }
};
