import { EventInterface } from "@/app";
import { router } from "@inertiajs/react";
import axios from "axios";

export async function submit(e : any, isEditForm : boolean, data : any, initialData : EventInterface | null, setErrors : Function){
  e.preventDefault();
  
  // если форма редактирования, то отправляем запрос на /events/edit/, если создания то на /events/create
  const url = isEditForm ? `/events/edit/` : `/events/create`;

    await axios({
      method: 'post',
      url: url,
      data: {
        name: data.name,
        date: data.date,
        short_description: data.short_description,
        description: data.description,
        time: data.timeNum,
        price: data.price,
        lecturer_id: data.lecturer_id,
        file: data.file,
        event_id: initialData?.id,
      },
      headers: {'Content-Type': 'multipart/form-data',}})
      .then(response => {
        router.visit('/cabinet/lecturer');
      })
      .catch(error => {
        console.error('Ошибка:', error);
        setErrors(error.response.data.errors);
      });
};