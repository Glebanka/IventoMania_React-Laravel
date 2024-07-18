import { EventInterface } from "@/app";
import { useDate } from "@/Components/contexts/DateContext";
import CalendarSVG from "@/Components/SVGs/CalendarSVG";
import ClockSVG from "@/Components/SVGs/ClockSVG";
import CloseSVG from "@/Components/SVGs/CloseSVG";
import ExternalLinkSVG from "@/Components/SVGs/ExternalLinkSVG";
import MoneySVG from "@/Components/SVGs/MoneySVG";
import PencilSVG from "@/Components/SVGs/PencilSVG";
import TickSVG from "@/Components/SVGs/TickSVG";
import TickWithClockSVG from "@/Components/SVGs/TickWithClockSVG";
import TrashSVG from "@/Components/SVGs/TrashSVG";
import { Link } from "@inertiajs/react";

export default function Event( {event, handleDeleteClick, handleChangeClick} :
  {event: EventInterface, handleDeleteClick: Function, handleChangeClick : Function}){
  return(
    <div key={event.id} className="flex flex-col gap-16 align-center cardochka">
      <div className="flex xl:flex-row flex-col justify-between align-center">
        <div className={`rounded-83px bg-cover bg-no-repeat bg-center self-center 
        ${event.isOutDated == true ? 'w-[400px] h-[400px]' : 'w-[600px] h-[600px]'}`}
        style={{ backgroundImage: `url(${event.imagePath})` }}></div>
        
        <div className={`border-radius flex flex-col sm:justify-between py-16 px-10 self-center xl:self-stretch
        ${event.isOutDated == true ? 'w-[880px] gap-4 justify-center' : 'w-3/6 py-16 sm:justify-between'} py-16`}>
          
          {event.isOutDated == true ?
          <Link href={`/event/${event.id}`} className="flex gap-2 w-full justify-between">
            <h3 className='text-primary text-[56px] font-bold eventTitle'>{event.name}</h3>
            <ExternalLinkSVG w={72} />
          </Link> :
          <Link href={`/event/${event.id}`} className="flex gap-2 ">
            <h3 className='text-primary text-4xl max-w-[500px] hyphens-auto font-bold eventTitle'>{event.name}</h3>
            <ExternalLinkSVG w={44} />
          </Link>
          }
          
          
          <p className="text-xl leading-tight mb-3 xl:mb-0 hyphens-auto"> {event.short_description} </p>
          
          <div className="flex flex-col mb-3 xl:mb-0">

            <div className="flex flex-row pb-1 items-center">
              {event.confirmed == 0 ? <>
                <TickWithClockSVG className="me-1" w={25} h={25} /><p className="text-xl leading-none">Ожидает подтверждения</p>
              </> 
              : event.confirmed == 1 ? <>
                <TickSVG fill="#1384D6" className="me-1" w={25} h={25} /><p className="text-xl leading-none">Подтвержден</p> 
              </>
              : event.confirmed == 2 ? <>
                <CloseSVG fill="#1384D6" className="me-1" w={25} h={25} /><p className="text-xl leading-none">Отменен</p>
              </>
              : null}
              
            </div>
            
            <div className="flex flex-row pb-1 items-center">
              <MoneySVG className="me-1" w={25} h={25}></MoneySVG>
              <p className="text-xl leading-none"> {event.price} ₽ </p>
            </div>

            <div className="flex flex-row pb-1 items-center">
              <CalendarSVG className="me-1" w={25} h={25}></CalendarSVG>
              <p className="text-xl leading-none">{event.formattedDate}{event.isOutDated == true && ', закончен'}</p>
            </div>
            
            <div className="flex flex-row pb-1 items-center">
              <ClockSVG className="me-1" w={25} h={25}></ClockSVG>
              <p className="text-xl leading-none"> {event.formattedTime} </p>
            </div>

          </div>

          {event.isOutDated == false &&
          <div className="flex gap-4">
            {/* Если ивент отменен админом, то мы не можем его больше редактировать */}
            {event.confirmed !== 2 && (
              <button className="btn flex gap-2 rounded-xl px-12 text-2xl items-center" 
              onClick={() => handleChangeClick(event.id)}>
                <PencilSVG w={30} /> Изменить
              </button>
            )}

              <button className={`btn rounded-xl flex gap-2 px-12 text-2xl items-center ${event.confirmed == 2 && 'w-full justify-center'}`} 
              onClick={() => handleDeleteClick(event.id)}>
                <TrashSVG w={35} /> Удалить
              </button>
          </div>}
        </div>
        
      </div>

      {/* Если в event есть массив users и он не пустой, то мы выводим его таблицей */}
      {event.users && event.users.length > 0 && <div className="pb-16 flex flex-col gap-6 items-center">
          <p className="text-[32px] font-bold text-primary text-center">Список зарегистрированных пользователей</p>
          <table className="w-[900px] border-">
            <thead>
              <tr className="*:pb-3">
                <th>ФИО</th>
                <th>Возраст</th>
                <th>Телефон</th>
                <th>Эл.почта</th>
                <th>Место</th>
              </tr>
            </thead>
            <tbody>
                {event.users.map(user => (
                  <tr className="text-center *:pb-3" key={user.id}>
                    <td>{user.fullname}</td>
                    <td>{user.age}</td>
                    <td>{user.tel}</td>
                    <td>{user.email}</td>
                    <td>{user.seat_id}</td>
                  </tr>))}
            </tbody>
          </table>
      </div>} 
    </div>
  )
}