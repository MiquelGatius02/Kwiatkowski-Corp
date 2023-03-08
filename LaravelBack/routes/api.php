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
Route::post('changePassword', [CustomAuthController::class, 'changePassword']);
Route::post('changeImg', [CustomAuthController::class, 'changeImg']);
Route::post('createRanking', [RankingController::class, 'createRanking']);
Route::post('login', [CustomAuthController::class, 'login']);
Route::post('createRanking', [RankingController::class, 'createRanking']);
Route::get('getUser', [RankingController::class, 'getUser']);



Route::group(['middleware' => ["auth:sanctum"]], function () {
    Route::get('infoRanking', [RankingController::class, 'infoRanking']);
    Route::get('getRanking', [RankingController::class, 'getRanking']);
    Route::get('userProfile', [CustomAuthController::class, 'userProfile']);
    Route::get('getRankingData', [RankingController::class, 'getRankingData']);
    Route::post('addRanking', [RankingController::class, 'addRanking']);
    Route::get('logout', [CustomAuthController::class, 'logout']);
});
