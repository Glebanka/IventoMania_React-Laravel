import { EventInterface} from "@/app";
import DateProvider from "@/Components/providers/DateProvider";
import PageLayout from "@/Layouts/PageLayout";
import EventForm from "./Components/EventForm";

export default function ManageEvent({ initialData } : {initialData: EventInterface | null}){
  return(
    <PageLayout>
      {/* Провайдер контекста даты */}
      <DateProvider>
        <div className="flex gap-12 flex-col container max-w-7xl mt-20">
          
          <EventForm initialData={initialData}></EventForm>
        </div>
      </DateProvider>
    </PageLayout>
  );
};