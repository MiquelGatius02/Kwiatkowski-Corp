<?php

namespace App\Http\Controllers;

use App\Models\petitions;
use App\Models\User;
use App\Models\Ranking;
use App\Models\RankingData;
use Illuminate\Http\Request;

class RankingDataController extends Controller
{
    // CREAR RANKING

    public function createRankingData(Request $request)
    {
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

    public function getRankingDataByUser(Request $request)
    {
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

    public function getRankingDataByCode(Request $request)
    {
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

    public function getUser(Request $request)
    {

        $user = User::get();

        if ($user) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $user
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
            "rank_id"       => "required",
            "user_logged"   => "required",
        ]);
        $user = RankingData::where('rank_code', $request->rank_id,)->first();
        $petitions = new petitions();
        $petitions->rank_code = $request->rank_id;
        $petitions->user_id = $request->user_logged;
        $petitions->professor_id = $user->user_id;
        $petitions->save();
        return response()->json([
            "status" => 1,
            "msg" => "Se ha realizado una solicitud de unión",
            "data" => $petitions
        ]);
    
    }
}
