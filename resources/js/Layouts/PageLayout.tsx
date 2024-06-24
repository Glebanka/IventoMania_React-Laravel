import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import ContentProvider from "@/Components/providers/ContentProvider";
import { Head } from "@inertiajs/react";

export default function Page( {children} ){
  return(
    <div>
      <Head title="Ивентомания" />
      <Header />
      {children}
      <Footer />
    </div>
  );
};