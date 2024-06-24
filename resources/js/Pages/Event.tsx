import { UserProps } from "@/app";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import DescSVG from "@/Components/SVGs/DescSVG";
import MapSVG from "@/Components/SVGs/MapSVG";
import MoneySVG from "@/Components/SVGs/MoneySVG";
import UserSVG from "@/Components/SVGs/UserSVG";
import PageLayout from "@/Layouts/PageLayout";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  name: string;
  datetime: string;
  short_description: string;
  description: string;
  place_id: number;
  price: string;
  confirmed: boolean;
  lecturer_id: number;
}
interface EventProps{
  event: Event;
  imagePath?: string;
  userName?: string;
}

interface Availability {
  [key: string]: boolean;
}


function Rent({event} : EventProps){

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
    if (user == 'undefined') {
      localStorage.setItem('seat', seat);
      router.visit('/login', {
        method: 'get',
      });
      return; // Прекращает выполнение функции rent
    }

    const formData = new FormData();
    formData.append('seat_id', seat);
    formData.append('event_id', event.id.toString());
    formData.append('user_id', user?.id.toString() || '');

    axios.post(route('rentEvent'), formData)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return(
    <div className="bg-[#E0E0E0] rounded-b-83px flex px-[270px] gap-12 flex-col py-12">
        <p className="text-5xl font-bold text-center">Забронируй место</p>
        <div className="flex gap-8">
          <div className="h-[270px] min-w-[170px] flex flex-col shadow-normal rounded-xl justify-center items-center">
            <UserSVG w={100} h={100} fill={'#000'}></UserSVG>
            <p className="text-2xl font-bold">Лектор</p>
          </div>
          <div className="flex flex-wrap gap-x-[19px] gap-y-7">
          {['1','3','5','7','2','4','6','8'].map(seatNum => (
              <button key={seatNum} className={`${seat == seatNum ? 'btn-square-inactive': ''} ${!availability[seatNum] ? 'btn-square-unavailable' : 'btn-square'}`} 
              onClick={() => setSeat(seatNum)}
              disabled={!availability[seatNum]}>
                {seatNum}
              </button>
            ))}
          </div>
        </div>
      <button className={`${seat == '' ? 'btn-unavailable' : 'btn bg-primary'}` } disabled={seat == '' ? true : false} onClick={rent}>Забронировать</button>
    </div>
  )
}

export default function Event( {event, imagePath, userName} : EventProps ) {
  function handleLogout() {
    router.post(route('logout'));
  }
  return(
    <PageLayout>
      

      <button onClick={handleLogout}>Logout</button>
      <div className="cardochka flex gap-14 flex-col container max-w-7xl mt-20 pt-5">
        <h2 className="text-center text-5xl text-primary font-bold">{event.name}</h2>
        <img className="rounded-2xl w-[740px] self-center" src={imagePath}></img>
        <div className="flex px-[270px] gap-8 flex-col">

          <div className="flex flex-col">
            <div className="flex flex-row pb-1 items-center">
                <UserSVG className="me-1" w={25} h={25} fill="#1384D6"></UserSVG>
                <p className="text-2xl text-primary font-bold">Кто проводит?</p>
            </div>
              <p className="text-xl">{userName}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row pb-1 items-center">
                <DescSVG className="me-1" w={25} h={25}></DescSVG>
                <p className="text-2xl text-primary font-bold">Что будем делать?</p>
            </div>
              <p className="text-xl">{event.description}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row pb-1 items-center">
                <CalendarSVG className="me-1" w={25} h={25}></CalendarSVG>
                <p className="text-2xl text-primary font-bold">Когда?</p>
            </div>
              <p className="text-xl">{event.datetime}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row pb-1 items-center">
                <MoneySVG className="me-1" w={25} h={25}></MoneySVG>
                <p className="text-2xl text-primary font-bold">Стоимость?</p>
            </div>
              <p className="text-xl">{event.price} ₽</p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row pb-1 items-center">
                <MapSVG className="me-1" w={25} h={25}></MapSVG>
                <p className="text-2xl text-primary font-bold">Где?</p>
            </div>
              <p className="text-xl">27 северная, 69</p>
          </div>
        </div>
        <Rent event={event}></Rent>
      </div>
    </PageLayout>
  )
}