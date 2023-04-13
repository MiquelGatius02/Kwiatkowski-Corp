<?php

namespace App\Http\Controllers;

use App\Models\petitions;
use App\Models\User;
use App\Models\Ranking;
use App\Models\RankingData;
use App\Models\softSkillsData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RankingDataController extends Controller
{
    // CREAR RANKING

    public function createRankingData(Request $request){
        $request->validate([
            'rank_code' => 'required',
            'user_id' => 'required',
            'points' => 'required'
        ]);

        $ranking = new RankingData();
        $ranking->rank_code = $request->rank_code;
        $ranking->user_id = $request->user_id;
        $ranking->points = $request->points;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "Datos insertados correctamente dentro del ranking $request->rank_code",
            "data" => $ranking
        ]);
    }


    // RECOLECTAR INFORMACIÓN DE RANKINGs

    public function getRankingDataByUser(Request $request){
        $request->validate([
            'user_id' => 'required'
        ]);

        $ranking = RankingData::where('user_id', '=', $request->user_id)->get();

        if ($ranking->user_id = $request->user_id) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $ranking
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getRankingDataByCode(Request $request){
        $request->validate([
            'rank_code' => 'required'
        ]);

        $ranking = RankingData::orderBy('points', 'DESC')->where('rank_code', '=', $request->rank_code)->get();

        if ($ranking->rank_code = $request->rank_code) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $ranking
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getUser(){

        $resultados = DB::table('users')
        ->join('softSkillsData', 'users.id', '=', 'softSkillsData.user_id')
        ->select('users.id','users.username','users.firstname', 'users.lastname',
        'softSkillsData.Nivel_responsabilidad','softSkillsData.Nivel_cooperacion',
        'softSkillsData.Nivel_autonomia_e_iniciativa','softSkillsData.Nivel_gestion_emocional',
        'softSkillsData.Nivel_habilidades_de_pensamiento')
        ->groupBy('users.id')
        ->get();

        if ($resultados) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $resultados,
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getSkills(){

        $skills = softSkillsData::get();

        if ($skills) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $skills
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function addRanking(request $request){


        $request->validate([
            "rank_id" => "required",
            "user_logged" => "required",
        ]);
 
        $user = Ranking::where('id', $request->rank_id,)->first();
        $petitions = new petitions();
        $petitions->rank_code = $request->rank_id;
        $petitions->user_id = $request->user_logged;
        $petitions->professor_id = $user->id_creador;
        $petitions->save();
        return response()->json([

            "status" => 1,
            "msg" => "Se ha realizado una solicitud de unión",
            "data" => $petitions

        ]);
    }

    public function deleteUser(request $request){

        $request->validate([
            "id_user" => "required",
            "id_rank" => "required"
        ]);

        $id = DB::table('rankingdata')->select('id')->where('rank_code',$request->id_rank)->where('user_id', $request->id_user)->first();
        DB::table('rankingdata')->where('id', $id->id)->delete();
        DB::commit();
        return response()->json([
            "status" => 1,
            "msg" => "Se ha borrado un usuario de un ranking"
        ]);
    }
}
