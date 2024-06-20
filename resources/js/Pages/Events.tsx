import DateButtons from "@/Components/DateButtons";
import DateProvider from "@/Components/providers/DateProvider";
import PageLayout from "@/Layouts/PageLayout";
import Event from "@/Components/Event";
import { useContext } from "react";
import DateContext from "@/Components/contexts/DateContext";
import CheckForEvent from "@/Components/CheckForEvent";

export default function Events( { events } ){
  function EventsList(){
    let { date } = useContext(DateContext);
    const month = date.getMonth() + 1;
    date = date.getDate() + ' ' + month;
    return(<>
    
      {events.map(event => (
        <>
          {/* <CheckForEvent> */}
          {date == event.date && <Event event={event}></Event>}
          {/* </ CheckForEvent> */}
        </>
      ))}
    </>
    )
  }
  return(
    <PageLayout>

        <div className="mt-20 flex-col flex container gap-11 max-w-7xl">

        <h2 className="text-center text-5xl text-primary font-bold">Список мастер-классов</h2>

        <DateProvider>
          <DateButtons size='big' />
            <EventsList />
          {/* {date !== event.date && <div>К сожалению, на этот день нет мероприятий.</div>} */}
          
        </DateProvider>
        </div>
      </PageLayout>
  );
}