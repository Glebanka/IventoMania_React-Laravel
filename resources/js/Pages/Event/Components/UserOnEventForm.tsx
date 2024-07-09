import UserSVG from "@/Components/SVGs/UserSVG";
import { Availability } from "./RentForm";

export default function UserOnEventForm({ availability, seat } : {availability : Availability, seat : string}){
  return(
    <>
      <p className="text-5xl font-bold text-center">Вы уже забронировали место</p>
      <div className="flex gap-8">
        <div className="h-[270px] min-w-[170px] flex flex-col shadow-normal rounded-xl justify-center items-center">
          <UserSVG w={100} h={100} fill={'#000'}></UserSVG>
          <p className="text-2xl font-bold">Лектор</p>
        </div>
      <div className="flex flex-wrap gap-x-[19px] gap-y-7">
      {['1','3','5','7','2','4','6','8'].map(seatNum => (
        <button key={seatNum} className={`
          ${!availability[seatNum] ? 'btn-square-unavailable' : 'btn-square'}
          cursor-default
          ${seat == seatNum ? 'btn-square-inactived': ''}`} 
          disabled>

          {seatNum}
        </button>
      ))}
      </div>
    </div>
    </>
  )
}