<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CustomAuthController extends Controller
{
    public function registerProfessor(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'firstname' => 'required',
            'lastname' => 'required',
            'centerOrDate' => 'required',
            'password' => 'required',
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->center = $request->centerOrDate;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario exitoso!",
        ]);
    }

    public function registerStudent(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'firstname' => 'required',
            'lastname' => 'required',
            'centerOrDate' => 'required',
            'password' => 'required',
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->date = $request->centerOrDate;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Registro de usuario exitoso!",
        ]);
    }

    public function login(Request $request)
    {

        $request->validate([
            "username" => "required",
            "password" => "required"
        ]);

        $user = User::where("username", "=", $request->username)->first();

        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
                //creamos el token
                $token = $user->createToken("auth_token")->plainTextToken;
                //si está todo ok
                return response()->json([
                    "status" => 1,
                    "msg" => "¡Usuario logueado exitosamente!",
                    "access_token" => $token
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "La password es incorrecta",
                ], 404);
            }
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "Usuario no registrado",
            ], 404);
        }
    }

    public function userProfile()
    {
        return response()->json([
            "status" => 0,
            "msg" => "Acerca del perfil de usuario",
            "data" => auth()->user()
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            "id" => "required",
            "password" => "required"
        ]);

        $user = user::find($request->id);

        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return response()->json([
            "status" => 0,
            "msg" => "Se ha cambiado la contraseña del usuario"
        ]);
    }

    public function changeImg(Request $request)
    {
        $request->validate([
            "id" => "required",
            "img" => "required"
        ]);

        $user = user::find($request->id);
        
        if ($user) { // verifica si $user no es nulo
            $user = DB::update('update users set imagen = "" WHERE id = ?',
            [$request->img,$request->id]);
            return response()->json([
                "status" => 0,
                "msg" => "aaaa",
                "data" => $user,
            ]);
            $user = DB::update('update users set imagen = ? WHERE id = ?',
            [$request->img,$request->id]);

            return response()->json([
                "status" => 0,
                "msg" => "Se ha cambiado la imagen del usuario",
                "data" => $user,
            ]);
        } else {
            return response()->json([
                "status" => 1,
                "msg" => "Ha ocurrido un error",
                "data" => $php_errormsg,
            ]);
        }
    }

    
}
