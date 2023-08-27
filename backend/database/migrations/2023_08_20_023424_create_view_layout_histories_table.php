<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * レイアウトの閲覧履歴を管理するview_layout_historiesテーブルの作成
 */
return new class extends Migration
{
    /**
     * @return void
     */
    public function up()
    {
        Schema::create('view_layout_histories', function (Blueprint $table) {
            $table->id('view_layout_history_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->foreignId('layout_id')->constrained('layouts', 'layout_id')->onDelete('cascade');
            $table->unique(['user_id', 'layout_id']);
            $table->index(['user_id', 'layout_id']);
            $table->timestamps();
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('view_layout_histories');
    }
};
