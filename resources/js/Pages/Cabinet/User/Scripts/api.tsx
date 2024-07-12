import { UserProps } from "@/app";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";

export function cancelRent(seatID: number, eventID: number, setpopUpOpened: Function){
  const { props } = usePage<{user: UserProps}>();
  const user = props.user;
  
  setpopUpOpened(false);
  const formData = new FormData();
  formData.append('event_id', eventID.toString());
  formData.append('seat_id', seatID.toString());
  formData.append('user_id', user.id.toString());
  axios.post('/cabinet/user/cancelRent', formData)
  .then(response => {
    router.reload({ only: ['events'] });
  })
  .catch(error => {
    console.error('Ошибка отмены брони:', error);
  });
}