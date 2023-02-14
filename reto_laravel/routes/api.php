<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register_student', [StudentController::class, 'register_student']);
Route::post('register_professor', [ProfessorController::class, 'register_professor']);

Route::post('loginUser', [LoginController::class, 'loginUser']);


Route::post('updatePasswordProf', [ProfessorController::class, 'updatePasswordProf']);
Route::post('updatePasswordStud', [StudentController::class, 'updatePasswordStud']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
