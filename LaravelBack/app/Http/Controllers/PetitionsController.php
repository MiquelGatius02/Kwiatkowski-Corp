<?php

namespace App\Http\Controllers;

use App\Models\petitions;
use Illuminate\Http\Request;

class PetitionsController extends Controller{
    public function getPetitions(Request $request){

        $request->validate([
            "id_prof"       => "required",
        ]);
        $petitionsData = petitions::where('professor_id', $request->id_prof,)->all();
        

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
}
