<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ブランドを管理するbrandsテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id('brand_id');
            $table->string('brand_name', 50);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brands');
    }
};
