import UserSVG from "@/Components/SVGs/UserSVG";

export default function StandartForm({ availability, seat, setSeat, rent }){
  return(
    <>
    <p className="text-5xl font-bold text-center">Забронируй место</p>   
      <div className="flex gap-8">
        <div className="h-[270px] min-w-[170px] flex flex-col shadow-normal rounded-xl justify-center items-center">
          <UserSVG w={100} h={100} fill={'#000'}></UserSVG>
          <p className="text-2xl font-bold">Лектор</p>
        </div>
        <div className="flex flex-wrap gap-x-[19px] gap-y-7">
          {['1','3','5','7','2','4','6','8'].map(seatNum => (
              <button key={seatNum} className={`${seat == seatNum ? 'btn-square-inactive': ''}
                ${!availability[seatNum] ? 'btn-square-unavailable' : 'btn-square'}`} 
              onClick={() => setSeat(seatNum)}
              disabled={!availability[seatNum]}>
                {seatNum}
              </button>
            ))}
        </div>
      </div>
      <button className={`${seat == '' ? 'btn-unavailable' : 'btn bg-primary'}` } 
      disabled={seat == '' ? true : false} 
      onClick={rent}>Забронировать</button>
    </>
  )
}