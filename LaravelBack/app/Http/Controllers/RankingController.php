<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Ranking;
use App\Models\RankingData;

class RankingController extends Controller
{
    public function createRanking(Request $request)
    {
        $request->validate([
            'rank_name',
            'rank_code' => 'required',
            'user_id',
        ]);

        $ranking = new Ranking();
        $ranking->rank_name = $request->rank_name;
        $ranking->rank_code = $request->rank_code;
        $ranking->user_id = $request->user_id;
        $ranking->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario exitoso!",
        ]);
    }
    public function getRankingData()
    {
        $ranking = Ranking::where('user_id', '=', auth()->user()->id)->get();

        return response()->json([
            "status" => 0,
            "msg" => "Acerca del perfil de usuario",
            "data" => $ranking
        ]);
    }

    public function addRanking(request $request)
    {
        $request->validate([
            "rank_id" => "required"
        ]);
        $rank = Ranking::where('rank_code', $request->rank_id)->first();

        if ($rank) {
            $ranking = new Ranking();
            $ranking->rank_name = $rank->rank_name;
            $ranking->rank_code = $rank->rank_code;
            $ranking->user_id = (auth()->user()->id);
            $ranking->save();
        }
    }
}
