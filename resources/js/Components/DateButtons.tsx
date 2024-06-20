import { useContext, useEffect, useState } from "react";
import DateContext from "./contexts/DateContext";
import { router } from "@inertiajs/react";


// создает пять значений {currentDate, dayOfWeek, day, month } и возращает массив
const generateNextFiveDays = () => {
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


  export default function DateButtons ( {size, sendAvailability} ){
    // создаем пять значений {currentDate, dayOfWeek, day, month } и отдаем их в новый массив dates 
    const dates = generateNextFiveDays();

    const { date, setNewDate } = useContext(DateContext);

    // задаем новое значение контексту date
    const handleDateButtonClick = (event : React.MouseEvent<HTMLButtonElement>, date : object) => {
      // запрещаем стандартное поведение кнопки (когда она находится в форме, она больше не будет отправлять её)
      event.preventDefault();
      setNewDate(date);
    };

    useEffect(() => {
      if (date) {
        const formattedDate = date.toISOString().split('T')[0];
        fetch(`/api/availability?date=${formattedDate}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            sendAvailability(data);
          })
          .catch(error => {
            console.error('Error fetching availability:', error);
          });
      }
    }, [date]);
  
    return (<>
      {size == 'small' ? (
          <div className="flex  justify-between w-full">
            {dates.map((buttonDate, index) => (
          // каждый buttonDate хранит значения {currentDate, dayOfWeek, day, month } согласно массиву dates, то есть
          // currentDate + i дней (сколько будет итераций заполнения в массив dates, столько будет кнопок)
          // выводим кнопки поочередно, согласно количеству значений в массиве dates 

          <button
            key={index}
            // если дата в нашей кнопке соответствует сегодняшней дате то даем класс btn-inactive
            className={`
              btn-small 
              ${date.getDate() === buttonDate.currentDate.getDate() ? 'btn-small-inactive' : ''} 
              `}
            onClick={(event) => handleDateButtonClick(event, buttonDate.currentDate)}>
              
          
            {/* если мы зашли в массив и видим кнопку с индексом 0, то кнопка то выводит текст 'сегодня', если индекс 1 то 'завтра',
            а все остальные выводят "Понедельник, 11 июн" (актуальную дату) согласно очереди */}  
            <div>
              {buttonDate.smallDayOfWeek}<br/>{buttonDate.day}
              </div>
          </button>
        ))}

          </div>
        ) : size == 'big' ?(
          <div className="flex gap-2 justify-center">
            {dates.map((buttonDate, index) => (
          // каждый buttonDate хранит значения {currentDate, dayOfWeek, day, month } согласно массиву dates, то есть
          // currentDate + i дней (сколько будет итераций заполнения в массив dates, столько будет кнопок)
          // выводим кнопки поочередно, согласно количеству значений в массиве dates 

          <button
            key={index}
            // если дата в нашей кнопке соответствует сегодняшней дате то даем класс btn-inactive
            className={`
              btn text-xl
              ${date.getDate() === buttonDate.currentDate.getDate() ? 'btn-inactive' : ''}
              `}
            onClick={(event) => handleDateButtonClick(event, buttonDate.currentDate)}>
              
          
            {/* если мы зашли в массив и видим кнопку с индексом 0, то кнопка то выводит текст 'сегодня', если индекс 1 то 'завтра',
            а все остальные выводят "Понедельник, 11 июн" (актуальную дату) согласно очереди */}  
            {index === 0 ? 'Сегодня' : index === 1 ? 'Завтра' : `${buttonDate.dayOfWeek}, ${buttonDate.day} ${buttonDate.month}`}
          </button>
        ))}
          </div>
        ) : null
        }
        </>

      // <div className="flex gap-2 justify-center">
      //   {dates.map((buttonDate, index) => (
      //     // каждый buttonDate хранит значения {currentDate, dayOfWeek, day, month } согласно массиву dates, то есть
      //     // currentDate + i дней (сколько будет итераций заполнения в массив dates, столько будет кнопок)
      //     // выводим кнопки поочередно, согласно количеству значений в массиве dates 

      //     <button
      //       key={index}
      //       // если дата в нашей кнопке соответствует сегодняшней дате то даем класс btn-inactive
      //       className={`
      //         ${size == "small" ? 'btn-small' : 'btn text-xl'} 
      //         ${date.getDate() === buttonDate.currentDate.getDate() && size == "small" ? 'btn-small-inactive' : ''} 
      //         ${date.getDate() === buttonDate.currentDate.getDate() && size == "big" ? 'btn-inactive' : ''}
      //         `}
      //       onClick={(event) => handleDateButtonClick(event, buttonDate.currentDate)}>
              
          
      //       {/* если мы зашли в массив и видим кнопку с индексом 0, то кнопка то выводит текст 'сегодня', если индекс 1 то 'завтра',
      //       а все остальные выводят "Понедельник, 11 июн" (актуальную дату) согласно очереди */}  
      //       {index === 0 ? 'Сегодня' : index === 1 ? 'Завтра' : `${buttonDate.dayOfWeek}, ${buttonDate.day} ${buttonDate.month}`}
      //     </button>
      //   ))}
      // </div>
    );
  };