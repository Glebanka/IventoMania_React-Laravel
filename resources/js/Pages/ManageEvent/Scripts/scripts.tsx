import { EventInterface, UserProps } from "@/app";
import { useDate } from "@/Components/contexts/DateContext";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";

// если есть начальные данные, то мы их используем для того чтобы заполнить стейт и контекст
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

// если пользователь не является создателем ивента который он хочет поменять, то он уходит с этой страницы
export function lecturerCheck(initialData: EventInterface | null, isEditForm: boolean){
  const { props } = usePage<{user: UserProps}>();
  const user = props.user;
  useEffect(() => {
    if(initialData?.lecturer_id!==user.id && isEditForm) {
      setTimeout(() => {
        router.get("/events");
      }, 1);
    }
  }, []);
}
export function unconfirmedCheck(initialData: EventInterface | null){
  useEffect(() => {
    if(initialData?.confirmed == 2) {
      setTimeout(() => {
        router.get("/events");
      }, 1);
    }
  }, []); 
}