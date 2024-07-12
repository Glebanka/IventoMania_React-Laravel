import { EventInterface } from "@/app";
import { useDate } from "@/Components/contexts/DateContext";
import { useEffect } from "react";

export function setDateTimeFromInitialData(initialData: EventInterface | null, setTime: Function, setData: Function){
  
  const { setNewDate } = useDate();
  useEffect(() => {
    // вызываем только один раз и только если initialData чему-то равна
    if(!!initialData){
      // Создание объекта Date из строки datetime
      let dateObject = new Date(initialData.datetime);
      
      // Получение часа из объекта Date
      let time = dateObject.getHours();

      // ставим новую дату в контексте даты
      setNewDate(dateObject);
            
      // ставим новое время в состояние времени
      setTime(time.toString());
    }}, []);
}