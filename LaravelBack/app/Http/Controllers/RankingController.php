<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Ranking;
use App\Models\RankingData;

class RankingController extends Controller
{

    // CREAR RANKING

    public function createRanking(Request $request){
        $request->validate([
            'id',
            'rank_name',
            'rank_description',
        ]);

        $ranking = new Ranking();
        $ranking->id = $request->id;
        $ranking->rank_name = $request->rank_name;
        $ranking->rank_description = $request->rank_description;
        $ranking->save();

        $ranking2 = new RankingData();
        $ranking2->rank_code = $ranking->id;
        $ranking2->user_id = auth()->user()->id;
        $ranking2->points = 0;
        $ranking2->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Ranking creado con éxito!",
        ]);
    }


    // RECOLECTAR INFORMACIÓN DE RANKINGs

    public function getRanking(){

        $ranking = Ranking::get();

        if ($ranking) {
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
}
