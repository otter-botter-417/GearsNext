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
        Schema::create('tag_positions', function (Blueprint $table) {
            $table->increments('tag_position_id');
            $table->unsignedInteger('layout_id');
            $table->unsignedInteger('item_id');
            $table->integer('x_position');
            $table->integer('y_position');
            $table->timestamps();
            $table->unique(['layout_id', 'item_id']);

            $table->foreign('layout_id')->references('layout_id')->on('layouts')->onDelete('cascade');
            $table->foreign('item_id')->references('item_id')->on('items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tag_positions');
    }
};
