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
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ranking_id');
            $table->unsignedBigInteger('evaluador');
            $table->unsignedBigInteger('evaluado');
            $table->unsignedBigInteger('points');
            $table->string('soft_skill');
            $table->date('date');
            $table->foreign('evaluador')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('evaluado')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('ranking_id')
                ->references('id')
                ->on('rankings')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
