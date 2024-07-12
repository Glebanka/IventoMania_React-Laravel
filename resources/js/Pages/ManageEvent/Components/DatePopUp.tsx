import DateButtons from "@/Components/DateButtons/DateButtons";
import CloseSVG from "@/Components/SVGs/CloseSVG";
import {useState } from "react";

export default function DatePopUp( {showPopUp, setData, setTime, time, animationTrigger} : 
  {showPopUp: Function, setData: Function, setTime: Function, time: number, animationTrigger : Boolean} ){

  interface Availability {
    [key: string]: boolean;
  }  
  const [availability, setAvailability] = useState<Availability>({});

  // Обработка нажатия на кнопки (поменять значение time на новое)
  const changeDateTime = (event : React.MouseEvent<HTMLButtonElement>, time : number) => {
    event.preventDefault();
    setTime(time);
    
    setData('timeNum', time);
    showPopUp(event, false);
  }

  return (
    <div className="w-full h-full fixed left-0 top-0 bg-slate-700 bg-opacity-55 z-10">
      <div className="popUpWrapper fixed -translate-y-1/2 top-2/4 h-5/6 w-full">
        <div className={"popUp flex flex-col gap-9 fixed h-full translate-x-1/2 right-1/2 bg-white rounded-3xl px-6 py-5 " + (animationTrigger ? "active" : "")}>
          <button onClick={(event) => showPopUp(event, false)} className="absolute right-6">
            <CloseSVG />
          </button>
          <p className="text-center text-2xl font-bold">Выберите дату и время</p>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">Июль</p>
            <DateButtons
            availability={availability}
            setAvailability={setAvailability}
            size='small' />
          </div>


          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">Утро</p>
            <div className="flex flex-wrap gap-2">
              {[8, 9, 10].map(timeSlot => (
                <button
                  key={timeSlot}
                  onClick={(event) => changeDateTime(event, timeSlot)}
                  className={`${time == timeSlot ? 'btn-small-inactive' : ''} w-44 py-4 text-xl ${availability[timeSlot] ? 'btn-small-unavailable' : 'btn-small'}`}
                  disabled={availability[timeSlot]}
                >
                  {`${timeSlot}:00-${timeSlot}:50`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">День</p>
            <div className="flex flex-wrap gap-2">
              {[11, 12, 13, 14, 15].map(timeSlot => (
                <button
                  key={timeSlot}
                  onClick={(event) => changeDateTime(event, timeSlot)}
                  className={`${time == timeSlot ? 'btn-small-inactive' : ''} w-44 py-4 text-xl ${availability[timeSlot] ? 'btn-small-unavailable' : 'btn-small'}`}
                  disabled={availability[timeSlot]}
                >
                  {`${timeSlot}:00-${timeSlot}:50`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">Вечер</p>
            <div className="flex flex-wrap gap-2">
              {[16, 17, 18].map(timeSlot => (
                <button
                  key={timeSlot}
                  onClick={(event) => changeDateTime(event, timeSlot)}
                  className={`${time == timeSlot ? 'btn-small-inactive' : ''} w-44 py-4 text-xl ${availability[timeSlot] ? 'btn-small-unavailable' : 'btn-small'}`}
                  disabled={availability[timeSlot]}
                >
                  {`${timeSlot}:00-${timeSlot}:50`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}