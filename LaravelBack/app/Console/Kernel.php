<?php

namespace App\Console;

use Carbon\Carbon;
use App\Models\User;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */


    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $fecha = Carbon::now()->subWeek()->format('Y-m-d');
            User::where('puntosSemanales', '<=', $fecha)->update(['puntosSemanales' => 1000, 'puntosSemanales' => Carbon::now()->format('Y-m-d')]);
        })->weekly();
    }
}
