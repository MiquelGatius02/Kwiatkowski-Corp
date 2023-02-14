<?php

namespace App\Http\Controllers;

use App\Models\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller{
    

    public function loginUser(Request $request){
        $request->validate([
            "Nick" => "required",
            "Password" => "required"
        ]);
        $user = DB::select('select * from students WHERE nick = ? AND Password = ?',
        [$request->Nick,$request->Password,]);
        if (isset($user)) {
                return response()->json([
                    "status" => 'OK',
                    "msg" => "¡Usuario logueado exitosamente!",
                    "data" => $user
                ]);
        }else{
            $user = DB::select('select * from professors WHERE nick = ? AND Password = ?',
            [$request->Nick,$request->Password,]);
            if (isset($user)) {
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
