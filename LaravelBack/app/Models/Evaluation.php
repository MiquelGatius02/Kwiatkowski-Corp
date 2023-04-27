<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    public $timestamps = false;
    public $table = "evaluations";
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'ranking_id',
        'evaluador',
        'evaluado',
        'points',
        'soft_skill',
        'date'
    ];
}
