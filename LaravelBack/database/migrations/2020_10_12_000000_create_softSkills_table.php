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
        Schema::create('softSkills', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre')->nullable();
        });

        DB::table('softSkills')->insert(
            array(
                'nombre' => 'Responsabilidad'
            )
        );

        DB::table('softSkills')->insert(
            array(
                'nombre' => 'Cooperación'
            )
        );

        DB::table('softSkills')->insert(
            array(
                'nombre' => 'Autonomía e iniciativa'
            )
        );

        DB::table('softSkills')->insert(
            array(
                'nombre' => 'Gestión emocional'
            )
        );

        DB::table('softSkills')->insert(
            array(
                'nombre' => 'Habilidades de pensamiento'
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('softSkills');
    }
};
