import { EventInterface } from "@/app";
import { router } from "@inertiajs/react";
import axios from "axios";

export async function submit(e : any, isEditForm : boolean, data : any, initialData : EventInterface | null, setErrors : Function){
  e.preventDefault();
  const url = isEditForm ? `/events/edit/` : `/events/create`;
  try {
    const response = await axios({
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
      headers: {'Content-Type': 'multipart/form-data',}});
    
    if (response.data == 'Success'){
      router.get(route('lecturer'));
    }
    
    const eventId = response.data.event.id;

    // Затем загружаем файл, связанный с этим ивентом
    const formData = new FormData();
    if (data.file !== null) {
      formData.append('file', data.file);
    }
    formData.append('event_id', eventId);

    await axios.post(route('uploadFile'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }})
      .then(response => {
        router.visit('/cabinet/lecturer');
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
      

  } catch(error : any) {
    setErrors(error.response.data.errors);
    console.error('Ошибка:', error);
  } 
};