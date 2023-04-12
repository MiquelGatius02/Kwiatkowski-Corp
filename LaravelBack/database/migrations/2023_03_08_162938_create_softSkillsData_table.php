<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('softSkillsData', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('Nivel_responsabilidad')->default(0);
            $table->integer('Nivel_cooperación')->default(0);
            $table->integer('Nivel_autonomia_e_iniciativa')->default(0);
            $table->integer('Nivel_gestion_emocional')->default(0);
            $table->integer('Nivel_habilidades_de_pensamiento')->default(0);
            $table->integer('Puntos');
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });

        DB::table('softSkillsData')->insert(
            array(
                'user_id' => '2',
                'Puntos' => 0,
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('softSkillsData');
    }
};
