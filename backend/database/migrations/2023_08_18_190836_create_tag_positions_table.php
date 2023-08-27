<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * タグの位置を管理するtag_positionsテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('tag_positions', function (Blueprint $table) {
            $table->id('tag_position_id');
            $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
            $table->foreignId('layout_id')->constrained('layouts', 'layout_id')->onDelete('cascade');
            $table->integer('x_position');
            $table->integer('y_position');
            $table->timestamps();
            $table->unique(['layout_id', 'item_id']);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tag_positions');
    }
};
