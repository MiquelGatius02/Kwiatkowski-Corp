<?php

namespace App\Http\Controllers;

use App\Models\Login;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller{
    

    public function loginUser(Request $request){

        $request->validate([
            "Nick" => "required",
            "Password" => "required"
        ]);
        $user = DB::select('select * from students WHERE nick = ?',
        [$request->Nick]);
        if ($user != null && password_verify($request->Password,$user[0]->password)) {
                return response()->json([
                    "status" => 'OK',
                    "msg" => "¡Usuario logueado exitosamente!",
                    "data" => $user
                ]);
        }else{
            $user = DB::select('select * from professors WHERE nick = ?',
            [$request->Nick]);
            if ($user != null && password_verify($request->Password,$user[0]->password)) {
                return response()->json([
                    "status" => 'OK',
                    "msg" => "¡Usuario logueado exitosamente!",
                    "data" => $user
                ]);
            }else{
                return response()->json([
                    "status" => 'KO',
                    "msg" => "¡Este usuario no existe!",
                ]);
            }
        }
    }
}
