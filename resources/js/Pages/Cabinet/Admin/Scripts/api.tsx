import { router } from "@inertiajs/react";
import axios from "axios";

export function confirmEvent(eventID: number){
  axios.post('/cabinet/admin/confirmEvent', {
    event_id: eventID
  })
  .then(response => {
    console.log(response);
    router.reload({ only: ['events'] });
  })
  .catch(error => {
    console.log(error);
  })
}
export function unconfirmEvent(eventID: number){
  axios.post('/cabinet/admin/unconfirmEvent', {
    event_id: eventID
  })
  .then(response => {
    console.log(response);
    router.reload({ only: ['events'] });
  })
  .catch(error => {
    console.log(error);
  })
}