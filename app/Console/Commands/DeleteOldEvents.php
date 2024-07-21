<?php

namespace App\Console\Commands;

use App\Traits\FileDeletionTrait;
use Illuminate\Console\Command;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class DeleteOldEvents extends Command
{
  use FileDeletionTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-old-events';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Удаляет ивенты, которые завершились более 5 дней назад';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Получаем текущую дату и время
        $now = Carbon::now();

        // Находим ивенты, завершившиеся более 5 дней назад
        $events = Event::where('datetime', '<', $now->subDays(5))->get();

        foreach ($events as $event) {
            // удаление ивента
            $event->delete();
            // удаление картинки
            $this->deleteEventFiles($event->id);

            $this->info("Event with ID {$event->id} has been deleted.");
        }

        $this->info('Old events deleted successfully.');
    }
}
