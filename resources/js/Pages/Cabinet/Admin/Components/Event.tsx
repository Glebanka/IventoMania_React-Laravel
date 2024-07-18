import { EventInterface } from "@/app";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import ClockSVG from "@/Components/SVGs/ClockSVG";
import CloseSVG from "@/Components/SVGs/CloseSVG";
import ExternalLinkSVG from "@/Components/SVGs/ExternalLinkSVG";
import MoneySVG from "@/Components/SVGs/MoneySVG";
import TickSVG from "@/Components/SVGs/TickSVG";
import UserUploadSVG from "@/Components/SVGs/UserUploadSVG";
import { Link } from "@inertiajs/react";
import { confirmEvent, unconfirmEvent } from "../Scripts/api";

export default function Event( {event} :
  {event: EventInterface}){
  return(
    <div key={event.id}
    className="flex flex-col gap-16 align-center cardochka">
            <div className="flex xl:flex-row flex-col justify-between align-center">
              <div className="rounded-83px w-[600px] h-[600px] bg-cover bg-no-repeat bg-center self-center" style={{ backgroundImage: `url(${event.imagePath})` }}></div>
              
              <div className="border-radius w-3/6 flex flex-col sm:justify-between py-16 px-10 self-center xl:self-stretch">
                
                <Link href={`/event/${event.id}`} className="flex gap-2 4xl">
                  <h3 className='text-primary text-4xl font-bold w-[500px] eventTitle'>{event.name}</h3>
                  <ExternalLinkSVG w={44} />
                </Link>
                
                
                <p className="text-xl leading-tight mb-3 xl:mb-0 hyphens-auto">{event.short_description} </p>
                
                <div className="flex flex-col mb-3 xl:mb-0">

                  
                  <div className="flex flex-row pb-1 items-center">
                    <UserUploadSVG className="me-1" w={25} h={25}></UserUploadSVG>
                    <p className="text-xl leading-none">{event.lecturer}</p>
                  </div>

                  <div className="flex flex-row pb-1 items-center">
                    <CalendarSVG className="me-1" w={25} h={25}></CalendarSVG>
                    <p className="text-xl leading-none">{event.formattedDate}</p>
                  </div>
                  
                  <div className="flex flex-row pb-1 items-center">
                    <ClockSVG className="me-1" w={25} h={25}></ClockSVG>
                    <p className="text-xl leading-none"> {event.formattedTime} </p>
                  </div>

                  <div className="flex flex-row pb-1 items-center">
                    <MoneySVG className="me-1" w={25} h={25}></MoneySVG>
                    <p className="text-xl leading-none"> {event.price} ₽ </p>
                  </div>

                </div>

                <div className="flex gap-4">
                    <button className="btn rounded-xl flex gap-2 items-center px-8 text-2xl" 
                    onClick={() => confirmEvent(event.id)}>
                      <TickSVG w={25} h={25} fill="currentColor" /> Подтвердить
                    </button>

                    <button className="btn rounded-xl flex gap-2 items-center px-8 text-2xl" 
                    onClick={() => unconfirmEvent(event.id)}>
                      <CloseSVG w={25} h={25} fill="currentColor" /> Отменить
                    </button>
                </div>
              </div>
              
            </div>
          </div>
  )
}