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
        Schema::create('size', function (Blueprint $table) {
            $table->increments('size_id');
            $table->float('open_width',5,1);
            $table->float('open_depth',5,1);
            $table->float('open_height',5,1);
            $table->float('storage_width',5,1);
            $table->float('storage_depth',5,1);
            $table->float('storage_height',5,1);
            $table->float('weight',5,1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('size');
    }
};
