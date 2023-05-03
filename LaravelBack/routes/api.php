<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AssignmentDataController;
use Illuminate\Http\Request;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\PetitionsController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\RankingDataController;
use App\Http\Controllers\softController;
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
Route::post('login', [CustomAuthController::class, 'login']);

//PETICIONES GET
Route::get('getPetitions', [PetitionsController::class, 'getPetitions']);
Route::get('getUserPetitions', [PetitionsController::class, 'getUserPetitions']);
Route::get('denegarPetitions', [PetitionsController::class, 'denegarPetitions']);


// RANKING
Route::get('getRanking', [RankingController::class, 'getRanking']);
Route::post('deleteRanking', [RankingController::class, 'deleteRanking']);
Route::post('regenerarCodigo', [RankingController::class, 'regenerarCodigo']);

//RANKING DATA
Route::post('createRankingData', [RankingDataController::class, 'createRankingData']);
Route::get('getRankingDataByUser', [RankingDataController::class, 'getRankingDataByUser']);
Route::get('getRankingDataByCode', [RankingDataController::class, 'getRankingDataByCode']);
Route::get('getUser', [RankingDataController::class, 'getUser']);
Route::post('deleteUser', [RankingDataController::class, 'deleteUser']);
Route::post('delAssignment', [AssignmentController::class, 'delAssignment']);
Route::post('setPoints', [AssignmentController::class, 'setPoints']);


Route::get('getEvaluation', [EvaluationController::class, 'getEvaluation']);
Route::get('getEvaluationDate', [EvaluationController::class, 'getEvaluationDate']);
Route::get('getEvaluationSoftSkill', [EvaluationController::class, 'getEvaluationSoftSkill']);
Route::get('getEvaluationEvaluado', [EvaluationController::class, 'getEvaluationEvaluado']);
Route::get('getEvaluationEvaluador', [EvaluationController::class, 'getEvaluationEvaluador']);
Route::get('getEvaluationBetween', [EvaluationController::class, 'getEvaluationBetween']);
Route::post('createEvaluation', [EvaluationController::class, 'createEvaluation']);


Route::group(['middleware' => ["auth:sanctum"]], function () {
    Route::post('deleteEvaluation', [EvaluationController::class, 'deleteEvaluation']);
    Route::post('Evaluate', [EvaluationController::class, 'Evaluate']);
    Route::post('createAssignmentData', [AssignmentController::class, 'createAssignmentData']);
    Route::get('getAssignment', [AssignmentController::class, 'getAssignment']);
    Route::post('createAssignment', [AssignmentController::class, 'createAssignment']);
    Route::post('createRanking', [RankingController::class, 'createRanking']);
    Route::post('addRanking', [RankingDataController::class, 'addRanking']);
    Route::get('userProfile', [CustomAuthController::class, 'userProfile']);
    Route::get('logout', [CustomAuthController::class, 'logout']);
    Route::get('aceptarPetitions', [PetitionsController::class, 'aceptarPetitions']);
});
