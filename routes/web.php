<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CabinetController;
use App\Http\Controllers\EventController;
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

// get запрос для показа главной страницы
Route::get('/', function () {
  return Inertia::render('Index/Index');
})->name('index');


// get запрос для показа страницы отдельного ивента
Route::get('/event/{id}', [EventController::class, 'showEvent'])->name('event');
// get запрос для показа страницы списка ивентов
Route::get('/events', [EventController::class, 'showEvents'])->name('events');


// функции доступные только авторизованным
Route::middleware('auth')->group(function () {
  

  // Функции для обычного пользователя
  
  // get запрос для показа страницы личного кабинета пользователя
  Route::get('/cabinet/user', [CabinetController::class, 'showUserCabinet']);
  // post запрос для функции бронирования ивента для пользователя
  Route::post('/events/rentEvent', [EventController::class, 'rentEvent'])->name('rentEvent');
  // post запрос для функции отмены брони ивента для пользователя 
  Route::post('/cabinet/user/cancelRent', [CabinetController::class, 'cancelRent']);
  

  // Функции для админа
  
  // get запрос для показа админки
  Route::get('/cabinet/admin', [CabinetController::class, 'showAdminCabinet']);
  // post запрос для функции подтверждения ивента
  Route::post('/cabinet/admin/confirmEvent', [AdminController::class, 'confirmEvent']);
  // post запрос для функции отклонения ивента
  Route::post('/cabinet/admin/unconfirmEvent', [AdminController::class, 'unconfirmEvent']);
  

  // Функции для Лектора
  
  // get запрос для показа Личного кабинета лектора
  Route::get('/cabinet/lecturer', [CabinetController::class, 'showLecturerCabinet'])->name('lecturer');
  // post запрос для функции удаления ивента для лектора
  Route::post('/cabinet/lecturer/deleteEvent', [CabinetController::class, 'deleteEvent']);
  // get запрос для показа формы редактирования ивента для лектора
  Route::get('/events/edit/{id}', [EventController::class, 'showEditForm']);
  // post запрос для обработки данных и редактирования ивента
  Route::post('/events/edit', [EventController::class, 'editEvent'])->name('editEvent');
  // get запрос для показа формы создания ивента для лектора
  Route::get('/events/create', function () {
    return Inertia::render('ManageEvent/ManageEvent', [
      'initialData' => null
    ]);});
  // post запрос для для обработки данных и создания ивента
  Route::post('/events/create', [EventController::class, 'newEvent'])->name('createEvent');
  // post запрос для создания файла картинки
  Route::post('/events/imgUpload', [EventController::class, 'fileUpload'])->name('uploadFile');
});

// функции для авторизации и регистрации
require __DIR__.'/auth.php';

// локальные функции
require __DIR__.'/api.php';
