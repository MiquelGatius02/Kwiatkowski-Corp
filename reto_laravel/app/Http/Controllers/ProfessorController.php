<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Professor;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfessorController extends Controller
{


    public function register_professor(Request $request)
    {

        try {

            DB::beginTransaction();
            $request->validate([
                'Nick' => 'required',
                'Nombre' => 'required',
                'Apellidos' => 'required',
                'Email' => 'required',
                'Centro' => 'required',
                'Password' => 'required',
            ]);
            $professor = new Professor();
            $professor->Nick = $request->Nick;
            $professor->Nombre = $request->Nombre;
            $professor->Apellidos = $request->Apellidos;
            $professor->Email = $request->Email;
            $professor->Centro = $request->Centro;
            $professor->Password = Hash::make($request->Password);
            $professor->save();
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "¡Registro de profesor exitoso!",
                "data" => $professor
            ]);
        } catch (\Exception $exp) {
            DB::rollBack();
            return response()->json([
                "status" => 'KO',
                "msg" => $exp,
            ]);
        }
    }

    
    public function updatePasswordProf(Request $request)
    {

        $request->validate([
            'Nick' => '',
            'Password' => '',
        ]);

        DB::update(
            'update professors set Password = ? WHERE Nick = ?',
            [$request->Nick, $request->Password]
        );
    }
}
