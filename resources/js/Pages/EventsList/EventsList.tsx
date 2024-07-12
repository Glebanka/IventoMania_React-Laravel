import DateProvider from "@/Components/providers/DateProvider";
import PageLayout from "@/Layouts/PageLayout";
import type { EventInterface } from "@/app";
import Event from "./Event";
import { useDate } from "@/Components/contexts/DateContext";
import DateButtons from "@/Components/DateButtons/DateButtons";

interface Events{
  events: EventInterface[];
}

export default function Events( { events } : Events ){
  function EventsList(){
    let { date } = useDate();
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
          
        </DateProvider>
        </div>
      </PageLayout>
  );
}