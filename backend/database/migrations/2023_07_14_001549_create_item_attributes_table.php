<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 商品の属性を管理するitem_attributesテーブルの作成
 */
return new class extends Migration
{
  /**
   * @return void
   */
  public function up()
  {
    Schema::create('item_attributes', function (Blueprint $table) {
      $table->id('item_attributes_id');
      $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
      $table->foreignId('category_id')->constrained('categories', 'category_id')->onDelete('cascade');
      $table->string('attribute_name', 50);
      $table->string('attribute_value', 50);
      $table->unique(['item_id', 'attribute_name']);
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
