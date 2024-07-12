// создает пять значений {currentDate, dayOfWeek, day, month } и возращает массив
export function generateNextFiveDays() {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const smallDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const dates = [];

  // 5 раз воспроизводим массив (5 значений в dates)
  for (let i = 0; i < 5; i++) {
    // берем за основу сегодняшнюю дату
    const currentDate = new Date();
    // устанавливаем дату на сегодня + i дней (чтобы каждая новая дата (каждое новое значение в dates) шла друг за другом, как идет массив)
    currentDate.setDate(currentDate.getDate() + i);
    const dayOfWeek = days[currentDate.getDay()];
    const smallDayOfWeek = smallDays[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    // создаем значение в массиве dates
    dates.push({currentDate, dayOfWeek, day, month, smallDayOfWeek});
  }

  return dates;
};