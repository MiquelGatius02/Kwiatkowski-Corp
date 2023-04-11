<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class softSkillsData extends Model
{
    use HasFactory;
    public $table = "softSkillsData";

    protected $fillable = [
        'user_id',
        'skill_id',
        'Nivel',
        'Puntos'
    ];
}
