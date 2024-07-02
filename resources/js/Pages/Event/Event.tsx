import type { EventInterface, UserProps } from "@/app";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import DescSVG from "@/Components/SVGs/DescSVG";
import MapSVG from "@/Components/SVGs/MapSVG";
import MoneySVG from "@/Components/SVGs/MoneySVG";
import UserSVG from "@/Components/SVGs/UserSVG";
import PageLayout from "@/Layouts/PageLayout";
import RentForm from "./Components/RentForm";

export interface EventProps{
  event: EventInterface;
  imagePath?: string;
  userName?: string;
}
export default function Event( {event, imagePath, userName} : EventProps ) {
  
  return(
    <PageLayout>
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

        <RentForm event={event}></RentForm>
        
      </div>
    </PageLayout>
  )
}