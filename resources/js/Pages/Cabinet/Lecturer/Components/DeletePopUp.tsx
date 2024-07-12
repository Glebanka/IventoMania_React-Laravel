import CloseSVG from "@/Components/SVGs/CloseSVG";
import { deleteEvent } from "../Scripts/api";

export default function DeletePopUp( {popUpOpened, setpopUpOpened, eventID, animationTrigger} : 
  {popUpOpened : Boolean, setpopUpOpened : Function, eventID : number, animationTrigger : Boolean}){

  return(
    <div className="w-full h-full fixed left-0 top-0 bg-slate-400 bg-opacity-30 z-10">
        <div className={"popUp fixed top-2/4 right-2/4 translate-x-1/2 -translate-y-1/2 bg-white h-fit rounded-3xl px-6 py-5 flex flex-col gap-9 " + (animationTrigger ? "active" : "")}>
        <button onClick={() => setpopUpOpened(false)} className="absolute right-6">
          <CloseSVG />
        </button>
        <p className="text-2xl w-[500px]">
          Вы уверены, что хотите удалить этот мастер-класс?
        </p>
        <button onClick={() => deleteEvent(eventID, setpopUpOpened)} className="btn text-2xl">
          Да, я уверен
        </button>
        </div>
    </div>
  )
}