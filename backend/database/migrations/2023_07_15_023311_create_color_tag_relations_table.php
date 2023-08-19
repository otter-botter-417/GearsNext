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
            $table->unsignedInteger('item_id');
            $table->unsignedInteger('color_tag_id');
            $table->foreign('item_id')->references('item_id')->on('items')->onDelete('cascade');
            $table->foreign('color_tag_id')->references('color_tag_id')->on('color_tags')->onDelete('cascade');
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
