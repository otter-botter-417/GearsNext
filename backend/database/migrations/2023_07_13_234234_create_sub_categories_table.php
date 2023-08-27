<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * サブカテゴリーを管理するsub_categoriesテーブルの作成
 * @extends Migration
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('sub_categories', function (Blueprint $table) {
            $table->id('sub_category_id');
            $table->string('sub_category_name', 50);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sub_categories');
    }
};
