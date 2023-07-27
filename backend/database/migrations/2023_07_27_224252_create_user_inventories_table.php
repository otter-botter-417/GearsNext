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
        Schema::create('user_inventories', function (Blueprint $table) {
            $table->increments('user_inventories_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('item_id');
            $table->foreign('user_id')->references('user_id')->on('user_registers')->onDelete('cascade');
            $table->foreign('item_id')->references('item_id')->on('items')->onDelete('cascade');
            $table->unique(['user_id', 'item_id']); // user_idとitem_idの組み合わせにユニーク制約を追加
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_inventories');
    }
};
