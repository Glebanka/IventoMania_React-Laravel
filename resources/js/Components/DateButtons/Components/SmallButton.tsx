import { useDate } from "@/Components/contexts/DateContext";

export default function SmallButton({index, buttonDate, handleDateButtonClick} :
  {index : number, buttonDate: any, handleDateButtonClick : Function}){
    // каждый buttonDate хранит значения {currentDate, dayOfWeek, day, month } согласно массиву dates, то есть
    // currentDate + i дней (сколько будет итераций заполнения в массив dates, столько будет кнопок)
    // выводим кнопки поочередно, согласно количеству значений в массиве dates 

  const { date } = useDate();
  return(
    <button
      key={index}
      // если дата в нашей кнопке соответствует сегодняшней дате то даем класс btn-inactive
      className={`
        btn-small 
        ${date.getDate() === buttonDate.currentDate.getDate() ? 'btn-small-inactive' : ''} 
        `}
      onClick={(event) => handleDateButtonClick(event, buttonDate.currentDate)}>
        
      
      <div>
        {buttonDate.smallDayOfWeek}<br/>{buttonDate.day}
      </div>
    </button>
  )
}