import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import ContentProvider from "@/Components/providers/ContentProvider";
import { Head } from "@inertiajs/react";

export default function Page( {children} : { children : React.ReactNode } ){
  return(
    <div>
      <Head title="Ивентомания" />
      <ContentProvider>
        <Header />
        {children}
      </ContentProvider>
      <Footer />
    </div>
  );
};