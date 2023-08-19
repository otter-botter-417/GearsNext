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
      $table->id('item_attributes_id');
      $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
      $table->foreignId('category_id')->constrained('categories', 'category_id')->onDelete('cascade');
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
