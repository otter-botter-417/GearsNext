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
        Schema::create('item_layout', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('item_id');
            $table->unsignedInteger('layout_id');
            $table->foreign('item_id')->references('item_id')->on('items')->onDelete('cascade');
            $table->foreign('layout_id')->references('layout_id')->on('layouts')->onDelete('cascade');
            $table->unique(['layout_id', 'item_id']);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_layout');
    }
};
