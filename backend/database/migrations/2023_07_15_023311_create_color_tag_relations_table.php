<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('color_tag_relations', function (Blueprint $table) {
        
        $table->increments('color_tag_relations_id');
        $table->unsignedInteger('item_id');
        $table->unsignedInteger('color_tag_id');
        $table->foreign('item_id')->references('item_id')->on('items')->onDelete('cascade');
        $table->foreign('color_tag_id')->references('color_tag_id')->on('color_tags')->onDelete('cascade');
    });}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('color_tag_relations');
    }
};
