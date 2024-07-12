import { useDate } from "@/Components/contexts/DateContext";

export default function BigButton({index, buttonDate, handleDateButtonClick} :
  {index : number, buttonDate: any, handleDateButtonClick : Function}){
    // каждый buttonDate хранит значения {currentDate, dayOfWeek, day, month } согласно массиву dates, то есть
    // currentDate + i дней (сколько будет итераций заполнения в массив dates, столько будет кнопок)
    // выводим кнопки поочередно, согласно количеству значений в массиве dates 
    const { date } = useDate();
  return (
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
  )
}