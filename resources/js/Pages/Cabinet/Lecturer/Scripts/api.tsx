import { router } from "@inertiajs/react";
import axios from "axios";

export function deleteEvent(event_id: number, setpopUpOpened: Function){
  setpopUpOpened(false);
  const formData = new FormData();
  formData.append('event_id', event_id.toString());
  axios.post('/cabinet/lecturer/deleteEvent', formData)
  .then(response => {
    router.reload({ only: ['events'] });
  })
  .catch(error => {
    console.error('Ошибка отмены брони:', error);
  });

}