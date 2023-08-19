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
        Schema::create('color_tag_relations', function (Blueprint $table) {

            $table->id('color_tag_relations_id');
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
        Schema::dropIfExists('color_tag_relations');
    }
};
