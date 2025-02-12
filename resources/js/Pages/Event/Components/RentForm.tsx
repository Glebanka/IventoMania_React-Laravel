import { UserProps } from "@/app";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { EventProps } from "../Event";
import UserOnEventForm from "./UserOnEventForm";
import StandartForm from "./StandartForm";
import LecturerForm from "./LecturerForm";
import { checkUserOnEvent, fetchAvailability} from "../Scripts/api";
export interface Availability {
  [key: string]: boolean;
}

export default function RentForm({event} : EventProps){
  const [availability, setAvailability] = useState<Availability>({});

  // проверяем что за пользователь сейчас зарегистрирован
  const { props } = usePage<{ user: UserProps | null }>();
  const user = props.user;

  fetchAvailability(event, setAvailability);

  const [seat, setSeat] = useState('');

  const [userOnEvent, setUserOnEvent] = useState(Boolean);

  checkUserOnEvent(event, setUserOnEvent, setSeat, user);

  return(
    <div className="bg-[#E0E0E0] rounded-b-83px flex px-[270px] gap-12 flex-col py-12">
      {/* Выводим стандартную форму, если пользователь не зарегистрирован */}
      {!user && (
        <StandartForm availability={availability} seat={seat} setSeat={setSeat} event={event}/>
      )}

      {/* Выводит форму для записи на мастер-класс если пользователь типа слушатель */}
      {user && userOnEvent == false && user.user_type_id == 1 && (
        <StandartForm availability={availability} seat={seat} setSeat={setSeat} event={event} />
      )}

      {/* Выводит информацию о том что человек записан если он не лектор и уже записан */}
      {user && userOnEvent === true && user.user_type_id !== 2 && (
        <UserOnEventForm availability={availability} seat={seat} />
      )}
  
      {/* Если авторизированный пользователь лектор, то выводится просто виджет свободных и занятых мест */}
      {(user && user.user_type_id === 2) && (
        <LecturerForm availability={availability} />
      )}
      
      {/* Если авторизированный пользователь админ, то выводится просто виджет свободных и занятых мест */}
      {(user && user.user_type_id === 3) && (
        <LecturerForm availability={availability} />
      )}
    </div>
  )
}