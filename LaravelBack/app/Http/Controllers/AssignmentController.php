<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Assignment_Data;
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

        return response()->json(
            $assignment
        );
    }

    public function createAssignmentData(Request $request)
    {
        $request->validate([
            'assignment_id' => 'required',
            'user_id' => 'required',
        ]);

        $assignment = new Assignment_Data();
        $assignment->assignment_id = $request->assignment_id;
        $assignment->user_id = $request->user_id;
        $assignment->points = 0;
        $assignment->save();

        return response()->json([
            "status" => 1,
            "msg" => "Se ha creado correctamente la tarea $request->assignment_id",
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

    public function setPoints(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'user_id' => 'required',
            'points' => 'required'
        ]);
        $assignment = Assignment_Data::where('assignment_id', $request->id)->where('user_id', $request->user_id)->first();
        if ($assignment) {
            $assignment->points = $request->points * 10;
            $assignment->save();
        }
        return response()->json(
            $assignment
        );
    }
}
