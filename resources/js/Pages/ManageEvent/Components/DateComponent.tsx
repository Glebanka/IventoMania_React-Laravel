import { useDate } from "@/Components/contexts/DateContext";

// Вызывается только после выбора даты и времени в попапе
export default function DateComponent( {time}: {time: string} ){
  // от сюда забираем контекст времени который мы уже задали в datepopup
  const { date } = useDate();
  const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const month = months[date.getMonth() + 1];
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  
  return (
    <>
      {/* Если time выбрано, то выводит информацию о времени и дате прямо в кнопку */}
      {time !== '' ? (
        <div className="flex flex-col text-lg items-center font-bold">
          <p>{day + ' ' + month + ', ' + dayOfWeek}</p>
          <p>{time}:00-{time}:50</p>
        </div>
      ): (
        // если не выбрано, то просит выбрать
        <p className="font-bold text-2xl">Выберите время</p>
      )}
    </>
  );
};