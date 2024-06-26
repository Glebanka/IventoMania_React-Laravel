import DateButtons from "@/Components/DateButtons";
import DateProvider from "@/Components/providers/DateProvider";
import PageLayout from "@/Layouts/PageLayout";
import { useContext } from "react";
import DateContext from "@/Components/contexts/DateContext";
import type { EventInterface } from "@/app";
import Event from "./Event";

interface Events{
  events: EventInterface[];
}

export default function Events( { events } : Events ){
  function EventsList(){
    const context = useContext(DateContext);

    if (!context) {
      return <div>Контекст даты не определен</div>;
    }

    let { date } = context;
    const month = date.getMonth() + 1;
    let formattedDate = date.getDate() + ' ' + month;

    // Фильтрация событий, совпадающих с formattedDate
    const eventsOnSelectedDate = events.filter(event => event.date === formattedDate);

    return(<>
      {eventsOnSelectedDate.length > 0 ? (
        eventsOnSelectedDate.map(event => (
        <div key={event.id}>
          {formattedDate == event.date && <Event event={event} />}
        </div>
      ))) : (
        <div className="cardochka pb-[528px] pt-8">
          <p className="text-4xl text-center font-bold">Нет событий на эту дату.</p>
        </div>
      )}
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