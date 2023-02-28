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

    public function addToRanking(Request $request)
    {
        $request->validate([
            'idUser' => 'required',
            'codRanking' => 'required',
        ]);

        $ranking = new RankingData();
        $ranking->idUser = $request->idUser;
        $ranking->codRanking = $request->codRanking;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario exitoso!",
        ]);
    }

    public function getRankingData(Request $request)
    {

        $request->validate([
            "idUser" => "required"
        ]);

        $ranking = RankingData::where("idUser", "=", $request->iduser, "AND", "codRanking", "=", $request->codigoSala)->first();

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
