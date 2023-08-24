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
        Schema::create('item_color_tag', function (Blueprint $table) {

            $table->id('item_color_tag');
            $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
            $table->foreignId('color_tag_id')->constrained('color_tags', 'color_tag_id')->onDelete('cascade');
            $table->unique(['item_id', 'color_tag_id']); // user_idとitem_idの組み合わせにユニーク制約を追加
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
