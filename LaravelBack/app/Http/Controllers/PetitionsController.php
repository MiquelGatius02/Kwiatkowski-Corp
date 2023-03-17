<?php

namespace App\Http\Controllers;

use App\Models\petitions;
use App\Models\RankingData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PetitionsController extends Controller{
    public function getPetitions(Request $request){

        $request->validate([
            "id_prof"       => "required",
        ]);
        $petitionsData = petitions::where('professor_id', $request->id_prof,)->get();

        if ($petitionsData) {
            return response()->json([
                "status" => 1,
                "msg" => "Tenemos estas peticiones",
                "data" => $petitionsData
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado peticiones"
            ]);
        }
    }
    public function getUserPetitions(Request $request){

        $request->validate([
            "id_user"       => "required",
        ]);

        $User = User::where('id', $request->id_user,)->get('username');

        if ($User) {
            return response()->json($User);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado usuarios"
            ]);
        }
    }

    public function denegarPetitions(Request $request){
        
        $request->validate([
            "id" => "required",
        ]);

        DB::table('petitions')->where('id', $request->id)->delete();
        DB::commit();

        return response()->json([
            "status" => 1,
            "msg" => "Peticion borrada"
        ]);
    }

    public function aceptarPetitions(Request $request){
        
        $request->validate([
            "id" => "required",
            "rank_id" => "required",
            "user_id" => "required"
        ]);

        DB::table('petitions')->where('id', $request->id)->delete();
        DB::commit();

        $User = User::where('username', $request->user_id,)->get('id');

        $ranking = new RankingData();
        $ranking->rank_code = $request->rank_id;
        $ranking->user_id = $User[0]->id;
        $ranking->points = 0;
        $ranking->save();
        return response()->json([
            "status" => 1,
            "msg" => "Se ha añadido el usuario al ranking.",
            "data" => $ranking
        ]);
    }
}
