<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'entity_id',
    ];

    // Если у вас есть связь с моделью Event
    public function event()
    {
        return $this->belongsTo(Event::class, 'entity_id');
    }
}
