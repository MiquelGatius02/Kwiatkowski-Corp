<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Professor extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'Nick',
        'Nombre',
        'Apellidos',
        'Email',
        'Centro',
        'Password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
