<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * カラータグを管理するcolor_tagsテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('color_tags', function (Blueprint $table) {
            $table->id('color_tag_id');
            $table->string('color_tag_name', 50);
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('color_tags');
    }
};
