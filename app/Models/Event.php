<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
      'name',
      'description',
      'place_id',
      'datetime',
      'price',
      'confirmed',
      'lecturer_id',
    ];
  
    public $timestamps = false;

}
