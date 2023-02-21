<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Ranking;

<<<<<<< Updated upstream
class RankingController extends Controller{
=======
class Ranking extends Controller
{
>>>>>>> Stashed changes

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

        $ranking = new Ranking();
        $ranking->idUser = $request->idUser;
        $ranking->codRanking = $request->codRanking;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario exitoso!",
        ]);
    }
}
