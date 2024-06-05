<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;
use Datetime;


class EventController extends Controller{
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
      

      return [
        'id' => $event->id,
        'name' => $event->name,
        'description' => $event->description,
        'place_id' => $event->place_id,
        'price' => $event->price,
        'date' => $date,
        'formattedDate' => $formattedDate,
        'formattedTime' => $formattedTime,
        'lecturer' => $user ? $user->fullname : null
      ];
    });

    return Inertia::render('Events',[
      'events' => $events
    ]);
  }

  public function newEvent(Request $request)
    {
      $request->validate([
        'name' => ['required', 'string'],
        'description' => ['required', 'string'],
        'place_id' => ['required', 'integer'],
        'price' => ['required', 'integer'],
        'lecturer_id' => ['required', 'integer'],
        'date' => ['required', 'string'],
        'time' => ['required', 'string'],
      ]);
        $date = $request['date'];
        $hour = $request['time'];
        $datetime = ['datetime' => $date . ' ' . $hour . ':00:00'];

        $request->merge($datetime);

        $this->create($request->all());

        return redirect()->route('cabinet');
    }
    protected function create(array $data)
    {
      return Event::create([
          'name' => $data['name'],
          'datetime' => $data['datetime'],
          'description' => $data['description'],
          'place_id' => $data['place_id'],
          'price' => $data['price'],
          'confirmed' => '0',
          'lecturer_id' => $data['lecturer_id'],
      ]);
    }
}