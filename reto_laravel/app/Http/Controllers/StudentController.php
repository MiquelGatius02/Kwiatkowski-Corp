<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{

    public function register_student(Request $request)
    {

        try {

            DB::beginTransaction();
            $request->validate([
                'Nick' => 'required',
                'Nombre' => 'required',
                'Apellidos' => 'required',
                'Email' => 'required',
                'fechaNacimiento' => 'required',
                'Password' => 'required',
            ]);
            $student = new Student();
            $student->Nick = $request->Nick;
            $student->Nombre = $request->Nombre;
            $student->Apellidos = $request->Apellidos;
            $student->Email = $request->Email;
            $student->fechaNacimiento = $request->fechaNacimiento;
            $student->Password = Hash::make($request->Password);
            $student->save();
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "¡Registro de estudiante exitoso!",
                "data" => $student
            ]);
        } catch (\Exception $exp) {
            DB::rollBack();
            return response()->json([
                "status" => 'KO',
                "msg" => $exp,
            ]);
        }
    }

    public function updatePasswordStud(Request $request)
    {
        $request->validate([
            'Nick' => '',
            'Password' => '',
        ]);



        DB::update(
            'UPDATE students SET password= ? WHERE nick = ?',
            [$request->Nick, $request->Password]
        );
    }
}
