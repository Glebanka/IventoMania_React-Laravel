import { useContent } from "@/Components/contexts/ContentContext";
import LecturerContent from "@/Pages/Index/LecturerContent";
import ListenerContent from "@/Pages/Index/ListenerContent";
import ContentProvider from "@/Components/providers/ContentProvider";
import PageLayout from "@/Layouts/PageLayout";

function ContentComponent() {
  const { content } = useContent();

  return (
    <>
      {/* Если выбран контент для слушателя, то выводим ListenerContent */}
      {content === 'listener' && <ListenerContent />}

      {/* Если выбран контент для лектора, то выводим LecturerContent */}
      {content === 'lecturer' && <LecturerContent /> }
    </>
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
