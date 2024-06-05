import DateContext from "@/Components/contexts/DateContext";
import DateButtons from "@/Components/DateButtons";
import DateProvider from "@/Components/providers/DateProvider";
import PageLayout from "@/Layouts/PageLayout";
import Event from "@/Components/Event";

export default function Events( { events } ){
  return(
    <PageLayout>

        <div className="mt-20 flex-col flex container gap-11 max-w-7xl">

        <h2 className="text-center text-5xl text-primary font-bold">Список мастер-классов</h2>

        <DateButtons />

        
        <DateProvider>
            {events.map(event => (
            <>
              <Event event={event}></Event>
            </>
            ))} 
        </DateProvider>
        </div>
      </PageLayout>
  );
}