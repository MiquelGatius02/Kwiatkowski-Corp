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
    public function up(){
        Schema::create('values_ranking', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('codRanking');
            $table->unsignedBigInteger('idAlumno');
            $table->integer('puntAlumno');
            $table->timestamps();
      
            $table->foreign('codRanking')
                ->references('id')
                ->on('ranking');

            $table->foreign('idAlumno')
                ->references('id')
                ->on('students');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('values_ranking');
    }
};
