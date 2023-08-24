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
        Schema::create('favorite_items', function (Blueprint $table) {
            $table->id('favorite_items_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->foreignId('item_id')->constrained('items', 'item_id')->onDelete('cascade');
            $table->unique(['user_id', 'item_id']); // user_idとitem_idの組み合わせにユニーク制約を追加
            $table->timestamps();
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favorite_items');
    }
};
