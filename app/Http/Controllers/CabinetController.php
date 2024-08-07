<?php

namespace App\Http\Controllers;

use App\Helpers\DateHelper;
use App\Models\Event;
use App\Models\User;
use App\Models\UsersOnEvents;
use App\Traits\FileDeletionTrait;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CabinetController extends Controller
{
  use FileDeletionTrait;
  function showUserCabinet(){

    // Получаем текущего пользователя
    $user = Auth::user();

    // Получаем все записи из таблицы UsersOnEvents для текущего пользователя
    $userEvents = UsersOnEvents::where('user_id', $user->id)->get();

    // Извлекаем все event_id из записей
    $eventIds = $userEvents->pluck('event_id')->toArray();

    // Получаем все события на основании event_id
    $events = Event::whereIn('id', $eventIds)->orderBy('datetime', 'desc')->get();

    // Преобразуем события, добавляя seat_id из userEvents
    $eventsWithSeats = $events->map(function ($event) use ($userEvents) {
      $userEvent = $userEvents->firstWhere('event_id', $event->id);
      $event->seat_id = $userEvent->seat_id;

      // Форматирование даты и времени
      $event->formattedDate = DateHelper::formatDate($event->datetime);
      $event->formattedTime = DateHelper::formatTime($event->datetime);
      $event->isOutDated = DateHelper::isOutdated($event->datetime);

      $date = new DateTime($event->datetime);

      $date = ltrim($date->format('d'), 0) . ' ' . ltrim($date->format('m'), 0);
      
      $lecturer = User::find($event->lecturer_id);

      $imagePath = Storage::url("public/events/{$event->id}.jpg");

      $event->imagePath = $imagePath;
      $event->lecturer = $lecturer->fullname;

      return $event;
    });

    return Inertia::render('Cabinet/User/User', [
      'events' => $eventsWithSeats,
  ]);
  }
  function cancelRent(Request $request){
    // Проверка наличия необходимых данных в запросе
    $validatedData = $request->validate([
      'seat_id' => 'required|integer',
      'event_id' => 'required|integer',
      'user_id' => 'required|integer'
  ]);
    // Поиск и удаление записи
    $deleteCount = UsersOnEvents::where([
      'seat_id' => $validatedData['seat_id'],
      'event_id' => $validatedData['event_id'],
      'user_id' => $validatedData['user_id'],
    ])->delete();
      
    // Проверка успешности удаления
    if ($deleteCount > 0) {
        return response()->json(['message' => 'Бронирование успешно отменено'], 200);
    } else {
        return response()->json(['message' => 'Ошибка при отмене бронирования, запись не найдена'], 404);
    }
  }
  function showLecturerCabinet(){
   // Получаем текущего пользователя
   $lecturer = Auth::user();

   // Получаем все события, где текущий пользователь является лектором
   $events = Event::where('lecturer_id', $lecturer->id)->orderBy('datetime', 'desc')->get();

   // Для каждого события получаем список пользователей, зарегистрированных на это событие
   $eventsWithParticipants = $events->map(function ($event) {
       $participants = UsersOnEvents::where('event_id', $event->id)
           ->join('users', 'users.id', '=', 'users_on_events.user_id')
           ->get(['users.fullname as fullname', 'users.age as age', 'users.tel as tel' , 'users.email as email', 'users_on_events.seat_id']);

           // Форматирование даты и времени
        $event->formattedDate = DateHelper::formatDate($event->datetime);
        $event->formattedTime = DateHelper::formatTime($event->datetime);
        $event->isOutDated = DateHelper::isOutdated($event->datetime);

        $event->imagePath = Storage::url("public/events/{$event->id}.jpg");
        $event->users = $participants;

       return $event;
   });

   return Inertia::render('Cabinet/Lecturer/Lecturer', [
       'events' => $eventsWithParticipants,
   ]);
  }
  function deleteEvent(Request $request){
    // Проверка наличия необходимых данных в запросе
    $validatedData = $request->validate([
      'event_id' => 'required|integer',
    ]);

    $result = UsersOnEvents::where([
      'event_id' => $validatedData['event_id'],
    ])->delete();
    $result2 = Event::where([
      'id' => $validatedData['event_id'],
    ])->delete();

    $this->deleteEventFiles($validatedData['event_id']);
  
    return response()->json(['message' => 'Успешно удалено'], 200);
  }
  function showAdminCabinet(){

    // Получаем все события, в которых
    $events = Event::where('confirmed', 0)->get()->map(function($event){
      // Форматирование даты и времени
      $event->formattedDate = DateHelper::formatDate($event->datetime);
      $event->formattedTime = DateHelper::formatTime($event->datetime);
      $event->isOutDated = DateHelper::isOutdated($event->datetime);

      $event->imagePath = Storage::url("public/events/{$event->id}.jpg");

      // добавляем имя пользователя
      $user = User::where('id', $event -> lecturer_id)->first();
      $userName = $user->fullname;

      $event->lecturer = $userName;

      return $event;
    });
    
    return Inertia::render('Cabinet/Admin/Admin', [
      'events' => $events,
    ]);
  }
}
