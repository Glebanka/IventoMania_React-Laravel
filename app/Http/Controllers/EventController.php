<?php

namespace App\Http\Controllers;
use App\Helpers\DateHelper;
use App\Models\UsersOnEvents;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;
use Datetime;
use Intervention\Image\ImageManager;
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

    // Форматирование даты и времени
    $event->formattedDate = DateHelper::formatDate($event->datetime);
    $event->formattedTime = DateHelper::formatTime($event->datetime);
    $event->isOutDated = DateHelper::isOutdated($event->datetime);

    $imagePath = Storage::url("public/events/{$id}.jpg");
    return Inertia::render('Event/Event',[
      'event' => $event,
      'imagePath' => $imagePath,
      'userName' => $userName,
    ]);
  }

  // функция забора данных с базы данных для вывода на /events
  public function showEvents(){
    // забираем все ивенты с бд, у которых confirmed=1
    $events = Event::where('confirmed', 1)->orderBy('datetime', 'asc')->get()->map(function ($event) {

      // Форматирование даты и времени
      $formattedDate = DateHelper::formatDate($event->datetime);
      $formattedTime = DateHelper::formatTime($event->datetime);
      $isOutDated = DateHelper::isOutdated($event->datetime);

      $user = User::where('id', $event -> lecturer_id)->first();

      $date = new DateTime($event->datetime);

      $date = ltrim($date->format('d'), 0) . ' ' . ltrim($date->format('m'), 0);

      $imagePath = Storage::url("public/events/{$event->id}.jpg");

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
        'isOutDated' => $isOutDated,
      ];
    });
    
    return Inertia::render('EventsList/EventsList',[
      'events' => $events,
    ]);
  }

  // функция для проверки занятости времени
  public function checkAvailability(Request $request)
    {
      $date = $request->input('date');
        if (!$date) {
            return response()->json(['error' => 'Date is required'], 400);
        }

      $times = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
      $placeIds = [1, 2, 3];
      $availability = [];

      foreach ($times as $time) {
        $datetime = $date . ' ' . $time . ':00:00';
        $availability[$time] = true;
        
        // проверяем не прошло ли уже это время
        if (DateHelper::isOutdated($datetime)) {
          $availability[$time] = false;
          continue;
        }
        
        // проверка на заполненность placeID
        $occupiedPlaces = 0;
        foreach ($placeIds as $placeId) {
            $exists = Event::where('datetime', $datetime)
                ->where('place_id', $placeId)
                ->exists();
        
            if ($exists) {
                $occupiedPlaces++;
            }
        }
      
        if ($occupiedPlaces == count($placeIds)) {
            $availability[$time] = false;
        }
      }
      // заменяем значения для обработки на фронте
      $availability['8'] = $availability['08'];
      unset($availability['08']);
      $availability['9'] = $availability['09'];
      unset($availability['09']);

    return response()->json($availability);
  }

  // функция валидирования и работы с данными и вызова функций создания ивента и картинки
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

        // Если $hour меньше 10, добавляем ведущий ноль
        if ($hour < 10) {
          $hour = '0' . $hour;
        }

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

        // Получаем файл из запроса
        $file = $request->file('file');

        $this->fileUpload($file, $event->id);

        // Редирект на маршрут кабинета лектора
        return redirect()->route('lecturer');
  }
  // функция создания ивента
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
  // функция создания картинки
  protected function fileUpload($file, $eventId)
    {
        // Генерируем уникальное имя файла с привязкой к ID ивента
        $fileName = $eventId . '.' . $file->getClientOriginalExtension();

        // Читаем содержимое файла
        $binaryData = file_get_contents($file->getRealPath());

        // create new image instance
        $image = ImageManager::imagick()->read($binaryData);

        // Ресайзим изображение до 600 пикселей по большей стороне
        $image->scale(width: 1200);

        // Сохраняем измененное изображение в локальном хранилище (в папку public/events)
        $image->save(storage_path('app/public/events/' . $fileName));

        // Возвращаем путь сохраненного файла или другую необходимую информацию
        return $image;
  }
    
  public function showEditForm($id){
    $event = Event::findOrFail($id);
    $event->imagePath = Storage::url("public/events/{$event->id}.jpg");

    // Форматирование времени
    $date = new DateTime($event -> datetime);
    $event->time = $date->format('H');
    // Удаляем ведущий ноль, если он есть
    $event->time = ltrim($event->time, '0');

    return Inertia::render('ManageEvent/ManageEvent',[
      'initialData' => $event
    ]);
  }

  public function editEvent(Request $request){    
    $event = Event::find($request->event_id);

    // Работа с датами
    $date = $request['date'];
    $hour = $request['time'];

    // Если $hour меньше 10, добавляем ведущий ноль
    if ($hour < 10) {
      $hour = '0' . $hour;
    }
    
    $datetime = ['datetime' => $date . ' ' . $hour . ':00:00'];
    $request->merge($datetime);

    $file = $request->file('file');

    $changedData = [];
    // Получаем все входящие данные запроса
    $inputData = $request->all();

    foreach ($inputData as $key => $value) {
        // Сравниваем текущие значения модели с входящими данными
        if ($event->$key != $value) {
            $changedData[$key] = $value;
        }
    }

    if (!empty($changedData)) {
      $event->update($changedData);

      if(!empty($file)){
        // Генерируем уникальное имя файла с привязкой к ID ивента
        $fileName = $request->event_id . '.' . $file->getClientOriginalExtension();

        // Читаем содержимое файла
        $binaryData = file_get_contents($file->getRealPath());

        // create new image instance
        $image = ImageManager::imagick()->read($binaryData);

        // Ресайзим изображение до 600 пикселей по большей стороне
        $image->scale(width: 1200);

        // Сохраняем измененное изображение в локальном хранилище (в папку public/events)
        $image->save(storage_path('app/public/events/' . $fileName));
      }

    }
    return redirect()->route('lecturer');
  }
}