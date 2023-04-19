<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class RankingData extends Model
{

    public $timestamps = false;
    public $table = "rankingdata";
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'rank_code',
        'user_id',
        'points',
        'puntosSemanales'

    ];
}
