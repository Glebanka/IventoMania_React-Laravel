import LecturerContent from "@/Pages/Index/LecturerContent";
import PageLayout from "@/Layouts/PageLayout";
import Events from "@/Components/EventsList/EventsList";
import { EventInterface } from "@/app";


export default function Index({ events }: { events: EventInterface[] }) {
  return(
    <PageLayout>
      <LecturerContent />
      <Events events={events}></Events>
    </PageLayout>
  );
};
