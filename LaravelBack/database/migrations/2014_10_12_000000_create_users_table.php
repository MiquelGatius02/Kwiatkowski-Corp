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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('center')->nullable();
            $table->string('date')->nullable();
            $table->string('password');
            $table->longText('imagen')->nullable();
            $table->integer('puntosSemanales')->default(1000)->max(1000);
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('users')->insert(
            array(
                'username' => 'pro',
                'email' => 'pro@mail.com',
                'firstname' => 'pro',
                'lastname' => 'proapellido',
                'center' => 'ilerna',
                'password' => md5('pro'),
            )
        );

        DB::table('users')->insert(
            array(
                'username' => 'est',
                'email' => 'est@mail.com',
                'firstname' => 'est',
                'lastname' => 'estapellido',
                'date' => '20-01-2000',
                'password' => md5('est'),
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};