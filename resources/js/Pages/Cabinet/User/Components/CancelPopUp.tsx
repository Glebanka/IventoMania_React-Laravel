import { UserProps } from "@/app";
import CloseSVG from "@/Components/SVGs/CloseSVG";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";

export default function CancelPopUp({setpopUpOpened, seatID, eventID} : {setpopUpOpened : Function, seatID : number, eventID : number}) {

  const { props } = usePage<{user: UserProps}>();
  const user = props.user;
  
  function cancelRent(seatID: number, eventID: number){
    setpopUpOpened(false);
    const formData = new FormData();
    formData.append('event_id', eventID.toString());
    formData.append('seat_id', seatID.toString());
    formData.append('user_id', user.id.toString());
    axios.post('/cabinet/user/cancelRent', formData)
    .then(response => {
      router.reload({ only: ['events'] });
    })
    .catch(error => {
      console.error('Ошибка отмены брони:', error);
    });
  }

  return(
    <div className="w-full h-full fixed left-0 top-0 bg-slate-400 bg-opacity-30 z-10 ">
                  
      <div className="fixed top-2/4 right-2/4 translate-x-1/2 -translate-y-1/2 bg-white w-600px h-fit rounded-3xl px-6 py-5 flex flex-col gap-9 ">
        <button onClick={() => setpopUpOpened(false)} className="absolute right-6">
          <CloseSVG />
        </button>
        <p className="text-2xl">
          Вы уверены, что хотите отменить бронь на этот мастер-класс?
        </p>
        <button onClick={() => cancelRent(seatID, eventID)} className="btn text-2xl">
          Да, я уверен
        </button>
      </div>
    </div>
  )
}
