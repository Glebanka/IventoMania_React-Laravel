<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTypes extends Model
{
    use HasFactory;
    protected $fillable = [
      'id',
      'type',
    ];
    public function user_types()
    {
        return $this->hasMany(User::class, 'user_type_id', 'id');
    }
    public $timestamps = false;
}
