import PageLayout from "@/Layouts/PageLayout";
import { Link, router, usePage } from "@inertiajs/react";
import type { EventInterface, UserProps } from "@/app";
import TicketSVG from "@/Components/SVGs/TicketSVG";
import UserSVG from "@/Components/SVGs/UserSVG";
import ClockSVG from "@/Components/SVGs/ClockSVG";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import CancelSVG from "@/Components/SVGs/CancelSVG";
import ExternalLinkSVG from "@/Components/SVGs/ExternalLinkSVG";
import { useEffect, useState } from "react";
import CancelPopUp from "./Components/CancelPopUp";

export default function User({events} : {events: EventInterface[]}) {
  let [popUpOpened, setpopUpOpened] = useState(Boolean);

  function handleLogout() {
    router.post(route('logout'));
  }
  const [eventID, setEventID] = useState<number>();
  const [seatID, setSeatID] = useState<number>();
  const [animationTrigger, setAnimationTrigger] = useState(false);

  function handleCancelClick(eventID: number, seatID: number) {
    setpopUpOpened(true);
    setEventID(eventID);
    setSeatID(seatID);
  }

  // при открытии попапа убираем возможность прокручивать фон, то есть overflow ставим hidden
  useEffect(() => {
    if (popUpOpened) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setAnimationTrigger(true);
    }, 10);
    } else {
      document.body.style.overflow = 'auto';
      setAnimationTrigger(false);
    }
  }, [popUpOpened]);
  
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
              
              <Link href={`/event/${event.id}`} className="flex justify-between 4xl">
                <h3 className='text-primary text-4xl font-bold w-[500px]'>{event.name}</h3>
                <ExternalLinkSVG w={44} />
              </Link>
              
              
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
              <button className="btn flex gap-2 rounded-xl px-12 text-2xl w-fit" onClick={() => handleCancelClick(event.id, event.seat_id)}><CancelSVG w={25} />Отменить запись</button> 
            </div>
          </div>
        </>
      ))}
      {/* Поп-ап, включается по кнопке выше */}
      {popUpOpened == true && eventID !== undefined && seatID !== undefined && 
          <CancelPopUp
          setpopUpOpened={setpopUpOpened}
          seatID={seatID} 
          eventID={eventID}
          animationTrigger={animationTrigger}
          />}
      
    </div>
  </PageLayout>
  )
}