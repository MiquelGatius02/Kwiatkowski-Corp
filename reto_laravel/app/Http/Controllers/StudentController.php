<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller{
    

    public function register_student(Request $request) {

        try{

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
            ]);

        }catch(\Exception $exp){
            DB::rollBack();
            return response()->json([
                "status" =>'KO',
                "msg" => "Maricon".$exp,
            ]);

        }
    }

    public function login_student(Request $request) {
        $request->validate([
            "Nick" => "required",
            "Password" => "required"
        ]);
        
        $user = Student::where("nick", "=", $request->Nick)->first();
        if( isset($user->id) ){
            if(Hash::check($request->Password, $user->password)){
                //creamos el token
                $token = $user->createToken("auth_token")->plainTextToken;
                //si está todo ok
                return response()->json([
                    "status" => 'OK',
                    "msg" => "¡Usuario logueado exitosamente!",
                    "access_token" => $token,
                ]);
            }else{
                return response()->json([
                    "status" => 'KO',
                    "msg" => "La password es incorrecta",
                ], 404);
            }
        }else{
            return response()->json([
                "status" => 'KO',
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }

    public function delete(Request $request) {

        if (auth()->user()->role == '1' || auth()->user()->role == '2') {

            try{

                DB::beginTransaction();
                $request->validate([
                    'id' => 'required',
                ]);
        
                $student = Student::find($request->id);
                $student = DB::table('students')->where('id',$request->id)->first();
                DB::table('students')->where('id',$request->id)->delete();

                return response()->json([
                    "status" => 1,
                    "msg" => "¡Un estudante ha sido borrado!",
                ]);
            }catch(\Exception $exp){

                return response()->json([
                    "status" =>'KO',
                    "msg" => $exp,
                ]);

            }
        }else{
            return response()->json([
                "status" => 1,
                "msg" => "Usted no tiene permisos para realizar esta operación",
            ]);
        }
    }

    public function select(Request $request) {

        if (auth()->user()->role == '1' || auth()->user()->role == '2' || auth()->user()->role == '4') {
            $request->validate([
                'id' => '',
                'Nombre' => '',
                'Apellidos' => '',
                'DNI' => '',
                'idCourse' => '',
            ]);
            $student = new student();
            $student = DB::select('select * from students WHERE id = ? OR Nombre = ? OR Apellidos = ? OR DNI = ? OR idCourse = ?',
            [$request->id,$request->Nombre,$request->Apellidos,$request->DNI,$request->idCourse]);
            

            return $student;

            return response()->json([
                "status" => 1,
                "msg" => "¡Un registro ha sido actualizado!",
            ]);
        }else{
            return response()->json([
                "status" => 1,
                "msg" => "Usted no tiene permisos para realizar esta operación",
            ]);
        }

    }

    public function update(Request $request) {

        if (auth()->user()->role == '1' || auth()->user()->role == '2') {
            $request->validate([
                'id' => '',
                'Nombre' => '',
                'Apellidos' => '',
                'DNI' => '',
                'idCourse' => '',
            ]);
        
            DB::update('update students set Nombre = ?,Apellidos = ?,DNI = ?,idCourse = ? WHERE id = ?',
            [$request->Nombre,$request->Apellidos,$request->DNI,$request->idCourse,$request->id]);
            

            return response()->json([
                "status" => 1,
                "msg" => "¡Un registro ha sido actualizado!",
            ]);
        }else{
            return response()->json([
                "status" => 1,
                "msg" => "Usted no tiene permisos para realizar esta operación",
            ]);
        }

    }

}
