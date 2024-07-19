import PageLayout from "@/Layouts/PageLayout";
import { Link, router} from "@inertiajs/react";
import type { EventInterface} from "@/app";
import TicketSVG from "@/Components/SVGs/TicketSVG";
import UserSVG from "@/Components/SVGs/UserSVG";
import ClockSVG from "@/Components/SVGs/ClockSVG";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import CancelSVG from "@/Components/SVGs/CancelSVG";
import ExternalLinkSVG from "@/Components/SVGs/ExternalLinkSVG";
import { useEffect, useState } from "react";
import CancelPopUp from "./Components/CancelPopUp";
import Tooltip from "@/Components/Tooltip";

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
            
           {/* если ивент уже прошел, то делаем картинку меньше */}
            <div className={`rounded-83px bg-cover bg-no-repeat bg-center self-center 
              ${event.isOutDated == true ? 'w-[400px] h-[400px]' : 'w-[600px] h-[600px]'}`}
              style={{ backgroundImage: `url(${event.imagePath})` }}></div>
            
            {/* если ивент уже прошел, то стиль карточки будет другой */}
            <div className={`border-radius flex flex-col px-10 self-center xl:self-stretch
              ${event.isOutDated == true ? 'w-[880px] gap-4 justify-center' : 'w-3/6 py-16 sm:justify-between'}`}>
              

              {/* если ивент уже прошел, то заголовок будет больше */}
              {event.isOutDated == true ?
                <Link href={`/event/${event.id}`} className="flex gap-2 w-full justify-between items-center">
                  <h3 className='text-primary text-[56px] leading-none font-bold eventTitle max-w-[720px]'>{event.name}</h3>
                  <ExternalLinkSVG w={72} />
                </Link> :
                <Link href={`/event/${event.id}`} className="flex gap-2 ">
                  <h3 className='text-primary text-4xl max-w-[500px] hyphens-auto font-bold eventTitle'>{event.name}</h3>
                  <ExternalLinkSVG w={44} />
                </Link>
              }
              
              
              <p className="text-xl leading-tight mb-3 xl:mb-0 hyphens-auto">{event.short_description} </p>
              
              <div className="flex flex-col mb-3 xl:mb-0">


              {/* если ивент уже прошел, то он покажет доп информацию */}
                <div className="flex flex-row pb-1 items-center">
                  <CalendarSVG className="me-1" w={25} h={25}></CalendarSVG>
                  <p className="text-xl leading-none">{event.formattedDate}</p>
                </div>
                
                <div className="flex flex-row pb-1 items-center">
                  <ClockSVG className="me-1" w={25} h={25}></ClockSVG>
                  <p className="text-xl leading-none flex"> {event.formattedTime}{event.isOutDated == true && (
                    <div className="flex">, закончен
                      <Tooltip w={21} h={21} fill="#575757">
                        <span>Вы не можете отменить бронь на этот мастер-класс.<br/> Он удалится сам через пять дней.</span>
                      </Tooltip>
                    </div>
                    )}
                  </p>
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
              {event.isOutDated == false &&
                <button className="btn flex gap-2 rounded-xl px-12 text-2xl w-fit" 
                onClick={() => handleCancelClick(event.id, event.seat_id)}>
                  <CancelSVG w={25} /> Отменить запись
                </button> 
              }
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