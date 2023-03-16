<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function createAssignment(Request $request)
    {
        $request->validate([
            'assignment_name' => 'required',
            'rank_code' => 'required',
            'prof_id' => 'required'
        ]);

        $assignment = new Assignment();
        $assignment->assignment_name = $request->assignment_name;
        $assignment->rank_code = $request->rank_code;
        $assignment->prof_id = $request->prof_id;
        $assignment->save();

        return response()->json([
            "status" => 1,
            "msg" => "Se ha creado correctamente la tarea $request->assignment_name",
            "data" => $assignment
        ]);
    }

    public function getAssignment()
    {
        $assignment = Assignment::get();

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

    public function delAssignment(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $assignment = Assignment::find($request->id);
        $assignment->delete();

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
