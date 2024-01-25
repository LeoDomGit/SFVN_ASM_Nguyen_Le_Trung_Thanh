<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fruit_tbl', function (Blueprint $table) {
            $table->id();
            $table->string('name',255);
            $table->string('unit',255);
            $table->string('image',255)->nullable();
            $table->integer('quantity');
            $table->bigInteger('price');
            $table->boolean('status')->default(1);
            $table->unsignedBigInteger('idCate');
            $table->foreign('idCate')->references('id')->on('cates_tbl');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fruit_tbl');
    }
};
