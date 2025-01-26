import { Link } from "@inertiajs/react";
import { useDate } from "@/Components/contexts/DateContext";
import { EventInterface } from "@/app";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import MoneySVG from "@/Components/SVGs/MoneySVG";
import ClockSVG from "@/Components/SVGs/ClockSVG";
import UserSVG from "@/Components/SVGs/UserSVG";

export default function Event( {event} : {event : EventInterface} ){
  const { date } = useDate();
  const month = date.getMonth() + 1;
  let formattedDate = date.getDate() + ' ' + month;
  return(
    <>
    {formattedDate == event.date && <div className="flex xl:flex-row flex-col justify-between align-center cardochka">
            
            {/* <img className="rounded-83px w-3/6 self-center" src={event.imagePath}></img> */}
            <div className="rounded-83px w-[600px] h-[600px] bg-cover bg-no-repeat bg-center self-center" style={{ backgroundImage: `url(${event.imagePath})` }}></div>
            
            <div className="border-radius w-3/6 flex flex-col sm:justify-between py-16 px-10 self-center xl:self-stretch">
              
              
              <h3 className='text-primary text-4xl font-bold eventTitle'>{event.name}</h3>
              
              <p className="text-xl leading-tight mb-3 xl:mb-0 hyphens-auto">{event.short_description} </p>
              
              <div className="flex-column d-flex mb-3 xl:mb-0">

          
                <div className="flex flex-row pb-1 items-center">
                  <CalendarSVG className="me-1" w={28} h={25}></CalendarSVG>
                  <p className="text-xl leading-none">{event.formattedDate}</p>
                </div>
          
                <div className="flex flex-row pb-1 items-center">
                  <MoneySVG className="me-1" w={28} h={25}></MoneySVG>
                  <p className="text-xl leading-none">{event.price} ₽</p>
                </div>
                
                <div className="flex flex-row pb-1 items-center">
                  <ClockSVG className="me-1" w={26} h={25}></ClockSVG>
                  <p className="text-xl leading-none"> {event.formattedTime} </p>
                </div>

                <div className="flex flex-row pb-1 items-center">
                  <UserSVG className="me-1" w={26} h={25} fill="#1384D6"></UserSVG>
                  <p className="text-xl leading-none"> {event.lecturer} </p>
                </div>

              </div>
              <Link href={`/event/${event.id}`} className="btn btn-primary px-12 text-3xl w-fit">Записаться на<br />Мастер-класс</Link>
            </div>
            
          </div>}
    </>
  )
}