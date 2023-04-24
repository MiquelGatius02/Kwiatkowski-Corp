<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\RankingData;
use App\Models\softSkillsData;
use App\Models\User;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    // CREAR RANKING

    public function createEvaluation(Request $request)
    {
        $request->validate([
            'ranking_id',
            'evaluador',
            'evaluado',
            'points',
            'soft_skill',
            'date'
        ]);

        $evaluation = new Evaluation();
        $evaluation->ranking_id = $request->ranking_id;
        $evaluation->evaluador = $request->evaluador;
        $evaluation->evaluado = $request->evaluado;
        $evaluation->points = $request->points;
        $evaluation->soft_skill = $request->soft_skill;
        $evaluation->date = $request->date;
        $evaluation->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Evaluation creado con éxito!",
        ]);
    }

    public function Evaluate(Request $request)
    {
        $request->validate([
            'puntos' => 'required',
            'soft_skill' => 'required',
            'user_id' => 'required',
            'rank_code' => 'required'
        ]);


        $check = RankingData::where('user_id', '=', auth()->user()->id)->where('rank_code', '=', $request->rank_code)->first();

        

        if ($check->puntosSemanales < $request->puntos) {
            return response()->json([
                "status" => 1,
                "msg" => "Puntos insuficientes",
            ]);
        } else {
            $evaluation = softSkillsData::where('user_id', '=', $request->user_id)->first();
            if ($evaluation) {
                if ($request->soft_skill == 1) {
                    $evaluation->Puntos_responsabilidad = $evaluation->Puntos_responsabilidad + $request->puntos;
                } else if ($request->soft_skill == 2) {
                    $evaluation->Puntos_cooperacion =  $evaluation->Puntos_cooperacion + $request->puntos;
                } else if ($request->soft_skill == 3) {
                    $evaluation->Puntos_autonomia_e_iniciativa = $evaluation->Puntos_autonomia_e_iniciativa + $request->puntos;
                } else if ($request->soft_skill == 4) {
                    $evaluation->Puntos_gestion_emocional = $evaluation->Puntos_gestion_emocional + $request->puntos;
                } else if ($request->soft_skill == 5) {
                    $evaluation->Puntos_habilidades_de_pensamiento =  $evaluation->Puntos_habilidades_de_pensamiento + $request->puntos;
                }
                $evaluation->save();

                $restar = RankingData::where('user_id', '=', auth()->user()->id)->where('rank_code', '=', $request->rank_code)->first();
                $restar->puntosSemanales = $restar->puntosSemanales - $request->puntos;
                $restar->save();

                return response()->json([
                    "status" => 1,
                    "msg" => "restado",
                ]);

            }
        }
    }

    public function getEvaluation()
    {

        $evaluation = Evaluation::get();

        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }
}
