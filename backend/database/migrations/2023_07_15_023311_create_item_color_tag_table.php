<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 商品とカラータグの中間テーブルを管理するitem_color_tagテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('item_color_tag', function (Blueprint $table) {

            $table->id('item_color_tag');
            $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
            $table->foreignId('color_tag_id')->constrained('color_tags', 'color_tag_id')->onDelete('cascade');
            $table->unique(['item_id', 'color_tag_id']);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_color_tag');
    }
};
