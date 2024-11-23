import { EventInterface, UserProps } from "@/app";
import Event from "./Components/Event";
import PageLayout from "@/Layouts/PageLayout";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DeletePopUp from "./Components/DeletePopUp";
import DateProvider from "@/Components/providers/DateProvider";

function handleLogout() {
  router.post(route('logout'));
}
export default function Lecturer( {events} : {events: EventInterface[]}){

  const { props } = usePage<{user: UserProps}>();
  const user = props.user;

  const [popUpOpened, setpopUpOpened] = useState(Boolean);
  const [eventID, setEventID] = useState<number>();
  const [animationTrigger, setAnimationTrigger] = useState(false);

  function handleChangeClick(eventID: number){
    router.visit('/events/edit/' + eventID);
  }
  function handleDeleteClick(eventID : number){
    setpopUpOpened(true);
    setEventID(eventID);
  }

  // при открытии попапа убираем возможность прокручивать фон, то есть overflow ставим hidden
  useEffect(() => {
    if (popUpOpened) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setAnimationTrigger(true);
    }, 10);
    } else {
      document.body.style.overflow = 'auto';
      setAnimationTrigger(false);
    }
  }, [popUpOpened]);
  
  // Фильтрация событий, совпадающих с event.lecturer_id
  const lecturerEvents = events.filter(event => event.lecturer_id === user.id);

  return(
    <PageLayout>
      <DateProvider>

      <div className="container max-w-7xl relative">
        <button className="btn text-lg right-0 absolute py-2 px-5" onClick={handleLogout}>Выйти</button>
      </div>
      <div className="flex gap-12 flex-col container max-w-7xl mt-20">
        <p className="text-5xl text-primary font-bold text-center">Ваши мастер-классы</p>
        

        {lecturerEvents.length > 0 ? (
          lecturerEvents.map(event => (
          <>
            <Event event={event}
            handleDeleteClick={handleDeleteClick}
            handleChangeClick={handleChangeClick}></Event>
          </>
        ))) : (
          <div className="cardochka pb-[528px] pt-8">
            <p className="text-4xl text-center font-bold">У вас нет созданных мастер-классов</p>
          </div>
        )}
  
        {/* Поп-ап, включается по кнопке выше */}
        {popUpOpened == true && eventID !== undefined ? 
          <DeletePopUp
          popUpOpened={popUpOpened}
          setpopUpOpened={setpopUpOpened}
          eventID={eventID}
          animationTrigger={animationTrigger}
          />
        : null}
      </div>
      </DateProvider>
    </PageLayout>
  )
}