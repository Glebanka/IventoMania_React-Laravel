<?php

namespace App\Http\Controllers;
use App\Models\UsersOnEvents;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;
use Datetime;
use Storage;

class EventController extends Controller{
  
  public function checkUserOnEvent(Request $request)
  {
    $exists = UsersOnEvents::where('user_id', $request->user_id)
      ->where('event_id', $request->event_id)
      ->exists();
    $seat_id = UsersOnEvents::where('user_id', $request->user_id)
    ->where('event_id', $request->event_id)
    ->first()->seat_id;

    return response()->json([
      'exists' => $exists,
      'seat_id' => $seat_id,
    ]);
  }

  public function checkSeatAvailability(Request $request)
  {
    $eventID = $request->input('id');
      if (!$eventID) {
          return response()->json(['error' => 'EventID is required'], 400);
      }

    $seats = ['1', '2', '3', '4', '5', '6', '7', '8'];
    $availability = [];

    foreach ($seats as $seat) {
      $availability[$seat] = true;
      $exists = UsersOnEvents::where('event_id', $eventID)
      ->where('seat_id', $seat)
      ->exists();
      if ($exists) {
        $availability[$seat] = false;
      }
    }

    return response()->json($availability);
  }

  // функция забора данных с базы данных для вывода на /event
  public function rentEvent(Request $request){
    // dd($request);
    $request->validate([
      'seat_id' => ['required', 'string'],
      'event_id' => ['required', 'string'],
      'user_id' => ['required', 'string'],
    ]);

    UsersOnEvents::create([
      'seat_id' => $request['seat_id'],
      'event_id' => $request['event_id'],
      'user_id' => $request['user_id'],
    ]);

    return response()->json('success');
  }
  // функция забора данных с базы данных для вывода на /event
  public function showEvent($id){
    $event = Event::findOrFail($id);

    // добавляем имя пользователя
    $user = User::where('id', $event -> lecturer_id)->first();
    $userName = $user->fullname;

    $imagePath = Storage::url("public/events/{$id}.jpg");
    return Inertia::render('Event/Event',[
      'event' => $event,
      'imagePath' => $imagePath,
      'userName' => $userName,
    ]);
  }

  // функция забора данных с базы данных для вывода на /events
  public function showEvents(){

    $events = Event::all()->map(function ($event) {

      $months = [
        'January' => 'января',
        'February' => 'февраля',
        'March' => 'марта',
        'April' => 'апреля',
        'May' => 'мая',
        'June' => 'июня',
        'July' => 'июля',
        'August' => 'августа',
        'September' => 'сентября',
        'October' => 'октября',
        'November' => 'ноября',
        'December' => 'декабря'
      ];

      $date = new DateTime($event -> datetime);

      // Форматирование даты в нужный формат
      $formattedDate = $date->format('d F Y года');

      // Перевод названия месяца на русский
      $month = $date->format('F');

      $formattedDate = str_replace($month, $months[$month], $formattedDate);

      // Форматирование времени в интервал
      $formattedTime = $date->format('H:00') . '-' . $date->format('H:55');

      $user = User::where('id', $event -> lecturer_id)->first();

      $date = ltrim($date->format('d'), 0) . ' ' . ltrim($date->format('m'), 0);

      $imagePath = Storage::url("public/events/{$event->id}.jpg");
      // dd([
      //   'id' => $event->id,
      //   'name' => $event->name,
      //   'short_description' => $event->short_description,
      //   'place_id' => $event->place_id,
      //   'price' => $event->price,
      //   'date' => $date,
      //   'formattedDate' => $formattedDate,
      //   'formattedTime' => $formattedTime,
      //   'lecturer' => $user ? $user->fullname : null,
      //   'imagePath' => $imagePath,
      // ]);
      return [
        'id' => $event->id,
        'name' => $event->name,
        'short_description' => $event->short_description,
        'place_id' => $event->place_id,
        'price' => $event->price,
        'date' => $date,
        'formattedDate' => $formattedDate,
        'formattedTime' => $formattedTime,
        'lecturer' => $user ? $user->fullname : null,
        'imagePath' => $imagePath,
      ];
    });
    
    return Inertia::render('EventsList/EventsList',[
      'events' => $events,
    ]);
  }

  // функция для показа страницы создания ивента

  public function checkAvailability(Request $request)
    {
      $date = $request->input('date');
        if (!$date) {
            return response()->json(['error' => 'Date is required'], 400);
        }

      $times = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
      $placeIds = [1, 2, 3];
      $availability = [];

      foreach ($times as $time) {
          $availability[$time] = true;

          foreach ($placeIds as $placeId) {
              $datetime = $date . ' ' . $time . ':00:00';
              $exists = Event::where('datetime', $datetime)
                  ->where('place_id', $placeId)
                  ->exists();

              if (!$exists) {
                  $availability[$time] = false;
                  break;
              }
          }
      }

    return response()->json($availability);
  }

  // функция записи данных в базу данных
  public function newEvent(Request $request)
    {
      // dd($request);
      $request->validate([
        'name' => ['required', 'string'],
        'short_description' => ['required', 'string'],
        'description' => ['required', 'string'],
        'price' => ['required', 'integer'],
        'lecturer_id' => ['required', 'integer'],
        'date' => ['required', 'string'],
        'time' => ['required', 'string'],
        'file' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // Максимум 10МБ
      ], [
        'file.max' => 'Размер файла не может быть более ' . (10240 / 1024) . ' Мегабайт.',
      ]);

        // Работа с датами
        $date = $request['date'];
        $hour = $request['time'];
        $datetime = ['datetime' => $date . ' ' . $hour . ':00:00'];
        $request->merge($datetime);


        // Поиск свободной зоны
        // Получаем все place_id
        $placeIds = [1, 2, 3];

        // Поиск первого свободного place_id
        $availablePlaceId = null;
        foreach ($placeIds as $placeId) {
            $exists = Event::where('datetime', $datetime['datetime'])
                ->where('place_id', $placeId)
                ->exists();
            
            if (!$exists) {
                $availablePlaceId = ['place_id' => $placeId];
                break;
            }
        }
        // Если нет доступного place_id, возвращаем ошибку
        if (is_null($availablePlaceId)) {
          return response()->json(['error' => 'Нет доступных зон для выбора под эту дату и время'], 422);
        }
        $request->merge($availablePlaceId);


        // Вызов функции создания ивента с передачей всех значений в $request
        $event = $this->create($request->all());

        // $file = $request->file('file');

        return response()->json(['event' => $event], 201);
        // // return redirect()->route('events');
        // return Inertia::render('EventUpload', [
        //   'event' => $event->only('id', 'name', 'datetime', 'short_description', 'description', 'place_id', 'price', 'confirmed', 'lecturer_id'),
        //   'file' => $file,
        // ]);
    }
    protected function create(array $data)
    {
      return Event::create([
          'name' => $data['name'],
          'datetime' => $data['datetime'],
          'short_description' => $data['short_description'],
          'description' => $data['description'],
          'place_id' => $data['place_id'],
          'price' => $data['price'],
          'confirmed' => '0',
          'lecturer_id' => $data['lecturer_id'],
      ]);
    }

    public function fileUpload(Request $request)
    {
      // dd($request);
        // Валидация файла и event_id
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // Максимум 10МБ
            'event_id' => 'required|integer|exists:events,id',
        ]);

        // Получение ID ивента
        $eventId = $request->input('event_id');

        // Получаем файл из запроса
        $file = $request->file('file');

        // Генерируем уникальное имя файла с привязкой к ID ивента
        $fileName = $eventId . '.' . $file->getClientOriginalExtension();

        // Сохраняем файл в локальном хранилище (в папку public/events)
        $filePath = $file->storeAs('public/events', $fileName);


        // Возвращаем путь сохраненного файла или другую необходимую информацию
        return redirect(route('events'));
    }
}