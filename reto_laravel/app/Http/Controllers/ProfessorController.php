<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Professor;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfessorController extends Controller{
    

    public function register_professor(Request $request) {
        
        try{

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
                "msg" => "¡Registro de estudiante exitoso!",
            ]);

        }catch(\Exception $exp){
            DB::rollBack();
            return response()->json([
                "status" =>'KO',
                "msg" => $exp,
            ]);

        }
    }

    public function login_professor(Request $request) {
        $request->validate([
            "Nick" => "required",
            "Password" => "required"
        ]);
        $user = Professor::where("nick", "=", $request->Nick)->first();
        if( isset($user->id) ){
            if(Hash::check($request->Password, $user->password)){
                //creamos el token
                $token = $user->createToken("auth_token")->plainTextToken;
                //si está todo ok

                return response()->json([
                    "status" => 1,
                    "msg" => "¡Usuario logueado exitosamente!",
                    "access_token" => $token,
                    "data" => $user
                ]);
            }else{
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",
                ], 404);
            }
        }else{
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }
}
