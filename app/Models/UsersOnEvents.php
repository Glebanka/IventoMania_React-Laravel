<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersOnEvents extends Model
{
  use HasFactory;

  protected $fillable = [
    'id',
    'seat_id',
    'user_id',
    'event_id',
  ];

  public $timestamps = false;
}