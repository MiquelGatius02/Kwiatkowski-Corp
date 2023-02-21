<?php

use Illuminate\Http\Request;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\RankingController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('registerProfessor', [CustomAuthController::class, 'registerProfessor']);
Route::post('registerStudent', [CustomAuthController::class, 'registerStudent']);
Route::post('login', [CustomAuthController::class, 'login']);
Route::post('getRanking', [RankingController::class, 'getRanking']);

Route::group(['middleware' => ["auth:sanctum"]], function () {
    Route::get('userProfile', [CustomAuthController::class, 'userProfile']);
    Route::get('logout', [CustomAuthController::class, 'logout']);
});
