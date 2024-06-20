import ContentContext from "@/Components/contexts/ContentContext";
import LecturerContent from "@/Components/LecturerContent";
import ListenerContent from "@/Components/ListenerContent";
import ContentProvider from "@/Components/providers/ContentProvider";
import PageLayout from "@/Layouts/PageLayout";
import { useContext } from "react";

function ContentComponent() {
  const { content } = useContext(ContentContext);

  return (
    <div>
      {/* Если выбран контент для слушателя, то выводим ListenerContent */}
      {content === 'listener' && <ListenerContent />}

      {/* Если выбран контент для лектора, то выводим LecturerContent */}
      {content === 'lecturer' && <LecturerContent /> }
    </div>
  );
}

export default function Index(){
  return(
    <ContentProvider>
      <PageLayout>
        <ContentComponent />
      </PageLayout>
    </ContentProvider>
  );
};
