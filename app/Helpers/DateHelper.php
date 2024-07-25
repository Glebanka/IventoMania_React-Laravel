<?php

namespace App\Helpers;

use DateTime;
use Illuminate\Support\Carbon;

class DateHelper
{
    protected static $months = [
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

    public static function formatDate($datetime)
    {
        $date = new DateTime($datetime);
        $formattedDate = $date->format('d F Y года');
        $month = $date->format('F');
        return str_replace($month, self::$months[$month], $formattedDate);
    }

    public static function formatTime($datetime)
    {
        $date = new DateTime($datetime);
        return $date->format('H:00') . '-' . $date->format('H:55');
    }

    public static function isOutdated($datetime)
    {
        // Создаем объект Carbon из переданной даты
        $date = Carbon::parse($datetime);
        // Создаем объект Carbon для текущей даты и времени
        $currentDate = Carbon::now();

        // Добавляем * часов, чтобы сравнять c часовым поясом  
        $timezoneOffset = config('app.timezone_offset');
        $currentDate->addHours($timezoneOffset);

        // Сравниваем даты
        return $date < $currentDate;
    }
}