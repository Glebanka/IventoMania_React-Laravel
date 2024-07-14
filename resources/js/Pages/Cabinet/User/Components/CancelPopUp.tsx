
import CloseSVG from "@/Components/SVGs/CloseSVG";
import { cancelRent } from "../Scripts/api";

export default function CancelPopUp({setpopUpOpened, seatID, eventID, animationTrigger} 
  : {setpopUpOpened : Function, seatID : number, eventID : number, animationTrigger: Boolean}) {

  return(
    <div className="w-full h-full fixed left-0 top-0 bg-slate-400 bg-opacity-30 z-10 " onClick={() => setpopUpOpened(false)}>
                  
      <div className={"popUp fixed top-2/4 right-2/4 translate-x-1/2 -translate-y-1/2 bg-white w-600px h-fit rounded-3xl px-6 py-5 flex flex-col gap-9 " + (animationTrigger ? "active" : "")}
      onClick={(event) => event.stopPropagation()}>
        <button onClick={() => setpopUpOpened(false)} className="absolute right-6">
          <CloseSVG />
        </button>
        <p className="text-2xl">
          Вы уверены, что хотите отменить бронь на этот мастер-класс?
        </p>
        <button onClick={() => cancelRent(seatID, eventID, setpopUpOpened)} className="btn text-2xl">
          Да, я уверен
        </button>
      </div>
    </div>
  )
}
