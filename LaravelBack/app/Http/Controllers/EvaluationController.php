<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\RankingData;
use App\Models\softSkillsData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EvaluationController extends Controller
{
    // CREAR RANKING

    public function createEvaluation(Request $request)
    {
        $request->validate([
            'ranking_id',
            'evaluador',
            'evaluado',
            'points',
            'soft_skill',
            'date'
        ]);

        $evaluation = new Evaluation();
        $evaluation->ranking_id = $request->ranking_id;
        $evaluation->evaluador = $request->evaluador;
        $evaluation->evaluado = $request->evaluado;
        $evaluation->points = $request->points;
        $evaluation->soft_skill = $request->soft_skill;
        $evaluation->date = $request->date;
        $evaluation->save();

        return response()->json([
            "status" => 1,
            "msg" => "¡Evaluation creado con éxito!",
        ]);
    }

    public function Evaluate(Request $request)
    {
        $request->validate([
            'puntos' => 'required',
            'soft_skill' => 'required',
            'user_id' => 'required',
            'rank_code' => 'required'
        ]);


        $check = RankingData::where('user_id', '=', auth()->user()->id)->where('rank_code', '=', $request->rank_code)->first();



        if ($check->puntosSemanales < $request->puntos) {
            return response()->json([
                "status" => 1,
                "msg" => "Puntos insuficientes",
            ]);
        } else {
            $evaluation = softSkillsData::where('user_id', '=', $request->user_id)->first();
            if ($evaluation) {
                if ($request->soft_skill == 1) {
                    $evaluation->Puntos_responsabilidad = $evaluation->Puntos_responsabilidad + $request->puntos;
                } else if ($request->soft_skill == 2) {
                    $evaluation->Puntos_cooperacion =  $evaluation->Puntos_cooperacion + $request->puntos;
                } else if ($request->soft_skill == 3) {
                    $evaluation->Puntos_autonomia_e_iniciativa = $evaluation->Puntos_autonomia_e_iniciativa + $request->puntos;
                } else if ($request->soft_skill == 4) {
                    $evaluation->Puntos_gestion_emocional = $evaluation->Puntos_gestion_emocional + $request->puntos;
                } else if ($request->soft_skill == 5) {
                    $evaluation->Puntos_habilidades_de_pensamiento =  $evaluation->Puntos_habilidades_de_pensamiento + $request->puntos;
                }
                $evaluation->save();

                $restar = RankingData::where('user_id', '=', auth()->user()->id)->where('rank_code', '=', $request->rank_code)->first();
                $restar->puntosSemanales = $restar->puntosSemanales - $request->puntos;
                $restar->save();


                if ($evaluation->Puntos_responsabilidad < 1000) {
                    $evaluation->Nivel_responsabilidad = 0;
                } else if ($evaluation->Puntos_responsabilidad >= 1000 && $evaluation->Puntos_responsabilidad < 2000) {
                    $evaluation->Nivel_responsabilidad = 1;
                } else if ($evaluation->Puntos_responsabilidad >= 2000 && $evaluation->Puntos_responsabilidad < 4000) {
                    $evaluation->Nivel_responsabilidad = 2;
                } else if ($evaluation->Puntos_responsabilidad >= 4000 && $evaluation->Puntos_responsabilidad < 7000) {
                    $evaluation->Nivel_responsabilidad = 3;
                } else if ($evaluation->Puntos_responsabilidad >= 7000 && $evaluation->Puntos_responsabilidad < 10000) {
                    $evaluation->Nivel_responsabilidad = 4;
                } else if ($evaluation->Puntos_responsabilidad >= 10000) {
                    $evaluation->Nivel_responsabilidad = 5;
                }

                if ($evaluation->Puntos_cooperacion < 1000) {
                    $evaluation->Nivel_cooperacion = 0;
                } else if ($evaluation->Puntos_cooperacion >= 1000 && $evaluation->Puntos_cooperacion < 2000) {
                    $evaluation->Nivel_cooperacion = 1;
                } else if ($evaluation->Puntos_cooperacion >= 2000 && $evaluation->Puntos_cooperacion < 4000) {
                    $evaluation->Nivel_cooperacion = 2;
                } else if ($evaluation->Puntos_cooperacion >= 4000 && $evaluation->Puntos_cooperacion < 7000) {
                    $evaluation->Nivel_cooperacion = 3;
                } else if ($evaluation->Puntos_cooperacion >= 7000 && $evaluation->Puntos_cooperacion < 10000) {
                    $evaluation->Nivel_cooperacion = 4;
                } else if ($evaluation->Puntos_cooperacion >= 10000) {
                    $evaluation->Nivel_cooperacion = 5;
                }

                if ($evaluation->Puntos_autonomia_e_iniciativa < 1000) {
                    $evaluation->Nivel_autonomia_e_iniciativa = 0;
                } else if ($evaluation->Puntos_autonomia_e_iniciativa >= 1000 && $evaluation->Puntos_autonomia_e_iniciativa < 2000) {
                    $evaluation->Nivel_autonomia_e_iniciativa = 1;
                } else if ($evaluation->Puntos_autonomia_e_iniciativa >= 2000 && $evaluation->Puntos_autonomia_e_iniciativa < 4000) {
                    $evaluation->Nivel_autonomia_e_iniciativa = 2;
                } else if ($evaluation->Puntos_autonomia_e_iniciativa >= 4000 && $evaluation->Puntos_autonomia_e_iniciativa < 7000) {
                    $evaluation->Nivel_autonomia_e_iniciativa = 3;
                } else if ($evaluation->Puntos_autonomia_e_iniciativa >= 7000 && $evaluation->Puntos_autonomia_e_iniciativa < 10000) {
                    $evaluation->Nivel_autonomia_e_iniciativa = 4;
                } else if ($evaluation->Puntos_autonomia_e_iniciativa >= 10000) {
                    $evaluation->Nivel_autonomia_e_iniciativa = 5;
                }

                if ($evaluation->Puntos_gestion_emocional < 1000) {
                    $evaluation->Nivel_gestion_emocional = 0;
                } else if ($evaluation->Puntos_gestion_emocional >= 1000 && $evaluation->Puntos_gestion_emocional < 2000) {
                    $evaluation->Nivel_gestion_emocional = 1;
                } else if ($evaluation->Puntos_gestion_emocional >= 2000 && $evaluation->Puntos_gestion_emocional < 4000) {
                    $evaluation->Nivel_gestion_emocional = 2;
                } else if ($evaluation->Puntos_gestion_emocional >= 4000 && $evaluation->Puntos_gestion_emocional < 7000) {
                    $evaluation->Nivel_gestion_emocional = 3;
                } else if ($evaluation->Puntos_gestion_emocional >= 7000 && $evaluation->Puntos_gestion_emocional < 10000) {
                    $evaluation->Nivel_gestion_emocional = 4;
                } else if ($evaluation->Puntos_gestion_emocional >= 10000) {
                    $evaluation->Nivel_gestion_emocional = 5;
                }

                if ($evaluation->Puntos_habilidades_de_pensamiento < 1000) {
                    $evaluation->Nivel_habilidades_de_pensamiento = 0;
                } else if ($evaluation->Puntos_habilidades_de_pensamiento >= 1000 && $evaluation->Puntos_habilidades_de_pensamiento < 2000) {
                    $evaluation->Nivel_habilidades_de_pensamiento = 1;
                } else if ($evaluation->Puntos_habilidades_de_pensamiento >= 2000 && $evaluation->Puntos_habilidades_de_pensamiento < 4000) {
                    $evaluation->Nivel_habilidades_de_pensamiento = 2;
                } else if ($evaluation->Puntos_habilidades_de_pensamiento >= 4000 && $evaluation->Puntos_habilidades_de_pensamiento < 7000) {
                    $evaluation->Nivel_habilidades_de_pensamiento = 3;
                } else if ($evaluation->Puntos_habilidades_de_pensamiento >= 7000 && $evaluation->Puntos_habilidades_de_pensamiento < 10000) {
                    $evaluation->Nivel_habilidades_de_pensamiento = 4;
                } else if ($evaluation->Puntos_habilidades_de_pensamiento >= 10000) {
                    $evaluation->Nivel_habilidades_de_pensamiento = 5;
                }

                $evaluation->save();


                $historial = new Evaluation();
                $historial->ranking_id = $request->rank_code;
                $historial->evaluador = auth()->user()->id;
                $historial->evaluado = $request->user_id;
                $historial->points = $request->puntos;
                if ($request->soft_skill == 1) {
                    $historial->soft_skill = "Reponsabilidad";
                } else if ($request->soft_skill == 2) {
                    $historial->soft_skill = "Cooperacion";
                } else if ($request->soft_skill == 3) {
                    $historial->soft_skill = "Autonomía e Iniciativa";
                } else if ($request->soft_skill == 4) {
                    $historial->soft_skill = "Puntos gestion emocional";
                } else if ($request->soft_skill == 5) {
                    $historial->soft_skill = "Habilidades de pensamiento";
                }
                $historial->date = date('Y-m-d H:i:s');;
                $historial->save();

                return response()->json([
                    "status" => 1,
                    "msg" => "Evaluado",
                ]);
            }
        }
    }

    public function getEvaluation()
    {

        $evaluation = Evaluation::get();

        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getEvaluationDate(Request $request)
    {
        $request->validate([
            'value' => 'required'
        ]);

        $evaluation = Evaluation::where('date', 'LIKE', '%' . $request->value . '%')->orderBy('date')->get();

        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getEvaluationEvaluado(Request $request)
    {
        $evaluation = Evaluation::where('evaluado', 'LIKE', '%' . $request->value . '%')->orderBy('date')->get();

        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getEvaluationEvaluador(Request $request)
    {
        $evaluation = Evaluation::where('evaluador', 'LIKE', '%' . $request->value . '%')->orderBy('date')->get();


        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getEvaluationSoftSkill(Request $request)
    {
        $evaluation = Evaluation::where('soft_skill', 'LIKE', '%' . $request->value . '%')->orderBy('date')->get();

        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function getEvaluationBetween(Request $request)
    {
        $evaluation = Evaluation::get();

        if ($evaluation) {
            return response()->json([
                "status" => 1,
                "msg" => "Se han recuperado los siguientes datos",
                "data" => $evaluation
            ]);
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "No se han encontrado registros"
            ]);
        }
    }

    public function deleteEvaluation(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'puntos' => 'required',
            'soft_skill' => 'required',
        ]);
        $evaluation = Evaluation::find($request->id);
        if ($evaluation) {
            $softskill = softSkillsData::where('user_id', '=', $evaluation->evaluado)->first();
            if ($request->soft_skill == 1) {
                $softskill->Puntos_responsabilidad = $softskill->Puntos_responsabilidad - $request->puntos;
            } else if ($request->soft_skill == 4) {
                $softskill->Puntos_cooperacion =  $softskill->Puntos_cooperacion - $request->puntos;
            } else if ($request->soft_skill == 3) {
                $softskill->Puntos_autonomia_e_iniciativa = $softskill->Puntos_autonomia_e_iniciativa - $request->puntos;
            } else if ($request->soft_skill == 2) {
                $softskill->Puntos_gestion_emocional = $softskill->Puntos_gestion_emocional - $request->puntos;
            } else if ($request->soft_skill == 5) {
                $softskill->Puntos_habilidades_de_pensamiento =  $softskill->Puntos_habilidades_de_pensamiento - $request->puntos;
            }

            if ($softskill->Puntos_responsabilidad < 1000) {
                $softskill->Nivel_responsabilidad = 0;
            } else if ($softskill->Puntos_responsabilidad >= 1000 && $softskill->Puntos_responsabilidad < 2000) {
                $softskill->Nivel_responsabilidad = 1;
            } else if ($softskill->Puntos_responsabilidad >= 2000 && $softskill->Puntos_responsabilidad < 4000) {
                $softskill->Nivel_responsabilidad = 2;
            } else if ($softskill->Puntos_responsabilidad >= 4000 && $softskill->Puntos_responsabilidad < 7000) {
                $softskill->Nivel_responsabilidad = 3;
            } else if ($softskill->Puntos_responsabilidad >= 7000 && $softskill->Puntos_responsabilidad < 10000) {
                $softskill->Nivel_responsabilidad = 4;
            } else if ($softskill->Puntos_responsabilidad >= 10000) {
                $softskill->Nivel_responsabilidad = 5;
            }

            if ($softskill->Puntos_cooperacion < 1000) {
                $softskill->Nivel_cooperacion = 0;
            } else if ($softskill->Puntos_cooperacion >= 1000 && $softskill->Puntos_cooperacion < 2000) {
                $softskill->Nivel_cooperacion = 1;
            } else if ($softskill->Puntos_cooperacion >= 2000 && $softskill->Puntos_cooperacion < 4000) {
                $softskill->Nivel_cooperacion = 2;
            } else if ($softskill->Puntos_cooperacion >= 4000 && $softskill->Puntos_cooperacion < 7000) {
                $softskill->Nivel_cooperacion = 3;
            } else if ($softskill->Puntos_cooperacion >= 7000 && $softskill->Puntos_cooperacion < 10000) {
                $softskill->Nivel_cooperacion = 4;
            } else if ($softskill->Puntos_cooperacion >= 10000) {
                $softskill->Nivel_cooperacion = 5;
            }

            if ($softskill->Puntos_autonomia_e_iniciativa < 1000) {
                $softskill->Nivel_autonomia_e_iniciativa = 0;
            } else if ($softskill->Puntos_autonomia_e_iniciativa >= 1000 && $softskill->Puntos_autonomia_e_iniciativa < 2000) {
                $softskill->Nivel_autonomia_e_iniciativa = 1;
            } else if ($softskill->Puntos_autonomia_e_iniciativa >= 2000 && $softskill->Puntos_autonomia_e_iniciativa < 4000) {
                $softskill->Nivel_autonomia_e_iniciativa = 2;
            } else if ($softskill->Puntos_autonomia_e_iniciativa >= 4000 && $softskill->Puntos_autonomia_e_iniciativa < 7000) {
                $softskill->Nivel_autonomia_e_iniciativa = 3;
            } else if ($softskill->Puntos_autonomia_e_iniciativa >= 7000 && $softskill->Puntos_autonomia_e_iniciativa < 10000) {
                $softskill->Nivel_autonomia_e_iniciativa = 4;
            } else if ($softskill->Puntos_autonomia_e_iniciativa >= 10000) {
                $softskill->Nivel_autonomia_e_iniciativa = 5;
            }

            if ($softskill->Puntos_gestion_emocional < 1000) {
                $softskill->Nivel_gestion_emocional = 0;
            } else if ($softskill->Puntos_gestion_emocional >= 1000 && $softskill->Puntos_gestion_emocional < 2000) {
                $softskill->Nivel_gestion_emocional = 1;
            } else if ($softskill->Puntos_gestion_emocional >= 2000 && $softskill->Puntos_gestion_emocional < 4000) {
                $softskill->Nivel_gestion_emocional = 2;
            } else if ($softskill->Puntos_gestion_emocional >= 4000 && $softskill->Puntos_gestion_emocional < 7000) {
                $softskill->Nivel_gestion_emocional = 3;
            } else if ($softskill->Puntos_gestion_emocional >= 7000 && $softskill->Puntos_gestion_emocional < 10000) {
                $softskill->Nivel_gestion_emocional = 4;
            } else if ($softskill->Puntos_gestion_emocional >= 10000) {
                $softskill->Nivel_gestion_emocional = 5;
            }

            if ($softskill->Puntos_habilidades_de_pensamiento < 1000) {
                $softskill->Nivel_habilidades_de_pensamiento = 0;
            } else if ($softskill->Puntos_habilidades_de_pensamiento >= 1000 && $softskill->Puntos_habilidades_de_pensamiento < 2000) {
                $softskill->Nivel_habilidades_de_pensamiento = 1;
            } else if ($softskill->Puntos_habilidades_de_pensamiento >= 2000 && $softskill->Puntos_habilidades_de_pensamiento < 4000) {
                $softskill->Nivel_habilidades_de_pensamiento = 2;
            } else if ($softskill->Puntos_habilidades_de_pensamiento >= 4000 && $softskill->Puntos_habilidades_de_pensamiento < 7000) {
                $softskill->Nivel_habilidades_de_pensamiento = 3;
            } else if ($softskill->Puntos_habilidades_de_pensamiento >= 7000 && $softskill->Puntos_habilidades_de_pensamiento < 10000) {
                $softskill->Nivel_habilidades_de_pensamiento = 4;
            } else if ($softskill->Puntos_habilidades_de_pensamiento >= 10000) {
                $softskill->Nivel_habilidades_de_pensamiento = 5;
            }

            $evaluation->delete();
            $softskill->save();
            return response()->json([
                "status" => 1,
                "msg" => "$request->puntos"
            ]);
        }
    }
}
