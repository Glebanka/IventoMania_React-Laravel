const generateNextFiveDays = () => {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const dates = [];
  
    // 5 раз воспроизводим массив (5 значений в dates)
    for (let i = 0; i < 5; i++) {
      // берем за основу сегодняшнюю дату
      const date = new Date();
      // устанавливаем дату на сегодня + i дней (чтобы каждая новая дата (каждое новое значение в dates) шла друг за другом, как идет массив)
      date.setDate(date.getDate() + i);
      const dayOfWeek = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      // создаем значение в массиве dates
      dates.push({ dayOfWeek, day, month });
    }
  
    return dates;
  };

  export default function DateButtons (){
    const dates = generateNextFiveDays();
  
    return (
      <div className="flex gap-2 justify-center">
        {dates.map((date, index) => (
          <button
            key={index}
            className={`btn text-xl ${index === 0 ? 'btn-inactive' : ''}`}
          >
          {/* date.setDate(date.getDate() + index); */}
          
            {/* если мы зашли в массив и видим кнопку с индексом 0, то кнопка то выводит сегодня, если индекс 1 то завтра,
            и все остальные выводят "Понедельник, 11 июн" (актуальную дату) по очереди */}
            {index === 0 ? 'Сегодня' : index === 1 ? 'Завтра' : `${date.dayOfWeek}, ${date.day} ${date.month}`}
          </button>
        ))}
      </div>
    );
  };