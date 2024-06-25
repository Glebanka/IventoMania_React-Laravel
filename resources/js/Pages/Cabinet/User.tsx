import PageLayout from "@/Layouts/PageLayout";
import { Link, router, usePage } from "@inertiajs/react";
import type { EventInterface, UserProps } from "@/app";
import TicketSVG from "@/Components/SVGs/TicketSVG";
import UserSVG from "@/Components/SVGs/UserSVG";
import ClockSVG from "@/Components/SVGs/ClockSVG";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import CancelSVG from "@/Components/SVGs/CancelSVG";
import ExternalLinkSVG from "@/Components/SVGs/ExternalLinkSVG";
import { useState } from "react";
import CloseSVG from "@/Components/SVGs/CloseSVG";
import axios from "axios";

export default function User({events} : {events: EventInterface[]}) {
  let [popUpOpened, setpopUpOpened] = useState(Boolean);

  const { props } = usePage<{user: UserProps}>();
  const user = props.user;

  function cancelRent(seat_id: string, event_id: number){
    setpopUpOpened(false);
    const formData = new FormData();
    formData.append('event_id', event_id.toString());
    formData.append('seat_id', seat_id.toString());
    formData.append('user_id', user.id.toString());
    axios.post('/cabinet/user/cancelRent', formData)
    .then(response => {
      router.reload({ only: ['events'] });
    })
    .catch(error => {
      console.error('Ошибка отмены брони:', error);
    });
  }


  function handleLogout() {
    router.post(route('logout'));
  }
  
  return(
    <PageLayout>
      <div className="container max-w-7xl relative">
        <button className="btn text-lg right-0 absolute py-2 px-5" onClick={handleLogout}>Выйти</button>
      </div>
    <div className="flex gap-12 flex-col container max-w-7xl mt-20">
      <p className="text-5xl text-primary font-bold text-center">Вы записаны</p>
      {events.map(event => (
        <>
         <div key={event.id} className="flex xl:flex-row flex-col justify-between align-center cardochka">
            
            <div className="rounded-83px w-[600px] h-[600px] bg-cover bg-no-repeat bg-center self-center" style={{ backgroundImage: `url(${event.imagePath})` }}></div>
            
            <div className="border-radius w-3/6 flex flex-col sm:justify-between py-16 px-10 self-center xl:self-stretch">
              
              <Link href={`/event/${event.id}`} className="flex gap-2 4xl"><h3 className='text-primary text-4xl font-bold'>{event.name}</h3><ExternalLinkSVG w={32} /></Link>
              
              
              <p className="text-xl leading-tight mb-3 xl:mb-0 hyphens-auto">{event.short_description} </p>
              
              <div className="flex flex-col mb-3 xl:mb-0">

                <div className="flex flex-row pb-1 items-center">
                  <CalendarSVG className="me-1" w={25} h={25}></CalendarSVG>
                  <p className="text-xl leading-none">{event.formattedDate}</p>
                </div>
                
                <div className="flex flex-row pb-1 items-center">
                  <ClockSVG className="me-1" w={25} h={25}></ClockSVG>
                  <p className="text-xl leading-none"> {event.formattedTime} </p>
                </div>

                <div className="flex flex-row pb-1 items-center">
                  <UserSVG className="me-1" w={25} h={25} fill="#1384D6"></UserSVG>
                  <p className="text-xl leading-none"> {event.lecturer} </p>
                </div>

                <div className="flex flex-row pb-1 items-center">
                  <TicketSVG className="me-1" w={25} h={25} />
                  <p className="text-xl leading-none"> {event.seat_id} место </p>
                </div>

              </div>
              <button className="btn btn-primary flex gap-2 rounded-xl px-12 text-2xl w-fit" onClick={() => setpopUpOpened(true)}><CancelSVG w={25} />Отменить запись</button> 

              {/* Поп-ап, включается по кнопке выше */}
              {popUpOpened == true ? 
              <div className="w-full h-full fixed left-0 top-0 bg-slate-400 bg-opacity-30 z-10 ">
                <div className="fixed top-2/4 right-2/4 translate-x-1/2 -translate-y-1/2 bg-white w-600px h-fit rounded-3xl px-6 py-5 flex flex-col gap-9 ">
                  <button onClick={() => setpopUpOpened(false)} className="absolute right-6">
                    <CloseSVG />
                  </button>
                  <p className="text-2xl">
                    Вы уверены, что хотите отменить бронь на этот мастер-класс?
                  </p>
                  <button onClick={() => cancelRent(event.seat_id, event.id)} className="btn text-2xl">
                    Да, я уверен
                  </button>
                </div>
              </div>: null}

            </div>
            
          </div>
        </>
      ))}
      
    </div>
  </PageLayout>
  )
}