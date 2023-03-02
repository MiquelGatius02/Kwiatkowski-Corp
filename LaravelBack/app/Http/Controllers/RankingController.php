<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Ranking;
use App\Models\RankingData;

class RankingController extends Controller
{
    public function createRanking(Request $request)
    {
        $request->validate([
            'nombre' => '',
            'codigo_sala' => 'required',
        ]);

        $ranking = new Ranking();
        $ranking->nombre = $request->nombre;
        $ranking->codigo_sala = $request->codigo_sala;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario al ranking exitoso!",
        ]);
    }

    public function addRanking(Request $request)
    {
        $request->validate([
            'iduser' => 'required',
            'codranking' => 'required'
        ]);

        $ranking = new RankingData();
        $ranking->iduser = $request->iduser;
        $ranking->codranking = $request->codranking;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro en ranking exitoso!",
        ]);
    }

    public function getRanking(Request $request)
    {

        $ranking = Ranking::all();

        if (isset($ranking)) {
            return response()->json([
                "status" => 1,
                "msg" => "¡Registros recuperados con éxito",
                "data" => $ranking
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros",
            ], 404);
        }
    }

    public function getRankingData(Request $request)
    {

        $request->validate([
            "iduser" => "required",
            "codranking" => "required"
        ]);

        $ranking = RankingData::where("idUser", "=", $request->iduser, "AND", "codRanking", "=", $request->codranking)->all();

        if (isset($ranking->id)) {
            return response()->json([
                "status" => 1,
                "msg" => "¡Registros recuperados con éxito",
                "data" => $ranking
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros",
            ], 404);
        }
    }
}
