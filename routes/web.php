<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index/Index');
});

Route::get('/event/{id}', [EventController::class, 'showEvent'])->name('event');
Route::get('/events', [EventController::class, 'showEvents'])->name('events');

Route::middleware('auth')->group(function () {
  Route::get('/events/create', function () {
      return Inertia::render('CreateEvent/CreateEvent');
  });
  Route::post('/events/create', [EventController::class, 'newEvent'])->name('createEvent');
  Route::post('/events/imgUpload', [EventController::class, 'fileUpload'])->name('uploadFile');
  Route::post('/events/rentEvent', [EventController::class, 'rentEvent'])->name('rentEvent');


  Route::get('/cabinet/admin', function () {
      return Inertia::render('Cabinet/Admin');
  });
  Route::get('/cabinet/user', function () {
      return Inertia::render('Cabinet/User');
  });
  Route::get('/cabinet/lecturer', function () {
      return Inertia::render('Cabinet/Lecturer');
  });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/api.php';
