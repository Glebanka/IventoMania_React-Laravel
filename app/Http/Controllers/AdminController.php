<?php

namespace App\Http\Controllers;
use App\Models\Event;
use Illuminate\Http\Request;


class AdminController extends Controller
{
  function confirmEvent(Request $request){
    $event = Event::find($request->event_id);
    if ($event) {
      $event->update(['confirmed' => 1]);

      return response()->json(['message' => 'Event has been confirmed'], 200);
    } else {
      // Обработка случая, когда событие не найдено
      return response()->json(['message' => 'Event not found'], 404);
    }
  }
  function unconfirmEvent(Request $request){
    $event = Event::find($request->event_id);
    if ($event) {
      $event->update(['confirmed' => 2]);
      
      return response()->json(['message' => 'Event has been unconfirmed'], 200);
    } else {
      // Обработка случая, когда событие не найдено
      return response()->json(['message' => 'Event not found'], 404);
    }
  }
}