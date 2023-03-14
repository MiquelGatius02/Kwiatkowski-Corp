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
        Schema::create('petitions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('rank_code');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('professor_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            
            $table->foreign('professor_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
            
            $table->foreign('rank_code')
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
        Schema::dropIfExists('rankingdata');
    }
};
