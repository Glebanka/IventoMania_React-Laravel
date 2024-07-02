import { UserProps } from "@/app";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import UserSVG from "@/Components/SVGs/UserSVG";
import { EventProps } from "../Event";
import UserOnEventForm from "./UserOnEventForm";
import StandartForm from "./StandartForm";
import LecturerForm from "./LecturerForm";

export default function RentForm({event} : EventProps){
  interface Availability {
    [key: string]: boolean;
  }
  const [availability, setAvailability] = useState<Availability>({});

  useEffect(() => {
    axios(`/api/seatAvailability?id=${event.id}`)
      .then(response => {
        setAvailability(response.data);
      })
      .catch(error => {
        console.error('Error fetching availability:', error);
      });
  }, []);

  // проверяем что за пользователь сейчас зарегистрирован
  const { props } = usePage<{ user: UserProps | 'undefined' }>();
  const user = props.user;

  const [seat, setSeat] = useState('');

  function rent(){
    // Если пользователь зарегистрирован, делаем запрос
    if (user !== 'undefined') {
      const formData = new FormData();
      formData.append('seat_id', seat);
      formData.append('event_id', event.id.toString());
      formData.append('user_id', user.id.toString());
  
      axios.post(route('rentEvent'), formData)
        .then(response => {
          router.visit('/cabinet/user')
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

  const [userOnEvent, setUserOnEvent] = useState(Boolean);

  // отправляет запрос тогда когда даже записей в usersOnEvent нет
  // проверка на то, человек записался на ивент или нет
  if (user !== 'undefined') {
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

  return(
    <div className="bg-[#E0E0E0] rounded-b-83px flex px-[270px] gap-12 flex-col py-12">
      {/* Выводит форму для записи на мастер-класс если человек не лектор и он уже не записан или если пользователь не зарегистрирован */}
      {userOnEvent == false && user.user_type_id !== 2 && <StandartForm availability={availability} seat={seat} setSeat={setSeat} rent={rent} />}

      {/* Выводит информацию о том что человек записан если он не лектор и уже записан */}
      {userOnEvent == true && user.user_type_id !== 2 && <UserOnEventForm availability={availability} seat={seat} /> }

      {/* Выводит информацию о том что человек записан если он не лектор и уже записан */}
      {user.user_type_id == 2 && <LecturerForm availability={availability} />}
    </div>
  )
}