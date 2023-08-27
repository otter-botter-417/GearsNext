<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 商品と商品タグの中間テーブルを管理するitem_item_tagテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('item_item_tag', function (Blueprint $table) {

            $table->id('item_item_tag');
            $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
            $table->foreignId('item_tag_id')->constrained('item_tags', 'item_tag_id')->onDelete('cascade');
            $table->unique(['item_id', 'item_tag_id']);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_item_tag');
    }
};
