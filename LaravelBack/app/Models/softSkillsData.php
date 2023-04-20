<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class softSkillsData extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $table = "softSkillsData";

    protected $fillable = [
        'user_id',
        'Nivel_responsabilidad',
        'Nivel_cooperación',
        'Nivel_autonomia_e_iniciativa',
        'Nivel_gestion_emocional',
        'Nivel_habilidades_de_pensamiento',

        'Puntos_responsabilidad',
        'Puntos_cooperación',
        'Puntos_autonomia_e_iniciativa',
        'Puntos_gestion_emocional',
        'Puntos_habilidades_de_pensamiento',
        
        'Puntos'
    ];
}
