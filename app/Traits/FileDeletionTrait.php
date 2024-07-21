<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait FileDeletionTrait
{
    public function deleteEventFiles($eventId)
    {
        $path = storage_path('app/public/events'); // Корневой путь хранения файлов
        $pattern = $path . '/' . $eventId . '.*'; // создание шаблона app/public/events/event_id.*

        // Найти все файлы, соответствующие шаблону
        $files = glob($pattern);

        // Преобразовать абсолютные пути в относительные
        $relativePaths = array_map(function($file) use ($path) {
            return str_replace($path . '/', 'public/events/', $file);
        }, $files);

        // Удалить найденные файлы
        Storage::delete($relativePaths);
    }
}