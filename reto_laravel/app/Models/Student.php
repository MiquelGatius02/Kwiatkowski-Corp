<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'Nick',
        'Nombre',
        'Apellidos',
        'Email',
        'fechaNacimiento',
        'Password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
