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
        Schema::table('items', function (Blueprint $table) {
            $table->index('item_name');
            $table->index('price');
            $table->index('brand_id');
            $table->index('category_id');
            $table->index('sub_category_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropIndex(['item_name']);
            $table->dropIndex(['price']);
            $table->dropIndex(['brand_id']);
            $table->dropIndex(['category_id']);
            $table->dropIndex(['sub_category_id']);
        });
    }
};