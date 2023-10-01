<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 商品を管理するitemsテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id('item_id'); 
            $table->string('item_name', 50);
            $table->foreignId('brand_id')->constrained('brands', 'brand_id')->onDelete('cascade');
            $table->integer('price');
            $table->string('image_url', 100);
            $table->string('asin', 10);
            $table->float('open_width', 5, 1);
            $table->float('open_depth', 5, 1);
            $table->float('open_height', 5, 1);
            $table->float('storage_width', 5, 1);
            $table->float('storage_depth', 5, 1);
            $table->float('storage_height', 5, 1);
            $table->float('weight', 5, 1);
            $table->foreignId('category_id')->constrained('categories', 'category_id')->onDelete('cascade');
            $table->foreignId('sub_category_id')->constrained('sub_categories', 'sub_category_id')->onDelete('cascade');
            $table->integer('favorite_count')->default(0);
            $table->integer('view_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};
