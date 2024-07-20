import { EventInterface, UserProps } from "@/app";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";

export function rent(seat: string, event: EventInterface, user: UserProps | null){
  
  // Если пользователь зарегистрирован, делаем запрос
  if (user) {
    const formData = new FormData();
    formData.append('seat_id', seat);
    formData.append('event_id', event.id.toString());
    formData.append('user_id', user.id.toString());

    axios.post(route('rentEvent'), formData)
      .then(response => {
        router.visit('/cabinet/user');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    // Если нет, то отправляем на страницу login
    } else {
      router.visit('/login', {
        method: 'get',
      });
  }
}
export function checkUserOnEvent(event: EventInterface, setUserOnEvent : Function, setSeat : Function, user: UserProps | null) {
  // проверка на то, человек записался на ивент или нет
  // отправляет запрос если польвозатель типа слушатель (user.user_type_id == 1)
  if (user && user.user_type_id == 1) {
      useEffect(() => {
        if (user) {
          axios.post('/api/userOnEventCheck', {
            user_id: user.id,
            event_id: event.id,
          })
            .then(response => {
              setUserOnEvent(response.data.exists);
              setSeat(response.data.seat_id);
            })
          }
      }, []);
    }
}

export function fetchAvailability(event: EventInterface, setAvailability: Function){
  useEffect(() => {
    axios(`/api/seatAvailability?id=${event.id}`)
      .then(response => {
        setAvailability(response.data);
      })
      .catch(error => {
        console.error('Error fetching availability:', error);
      });
  }, []);
}