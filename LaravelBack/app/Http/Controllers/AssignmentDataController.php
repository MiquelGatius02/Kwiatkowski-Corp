<?php

namespace App\Http\Controllers;

use App\Models\Assignment_Data;
use Illuminate\Http\Request;

class AssignmentDataController extends Controller
{

    public function getAssignmentData()
    {
        $assignment = Assignment_Data::get();

        if ($assignment) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $assignment
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }


}
