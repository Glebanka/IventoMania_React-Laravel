<?php

namespace App\Helpers;

use DateTime;

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
        $date = new DateTime($datetime);
        $currentDate = new DateTime();
        return $date < $currentDate;
    }
}