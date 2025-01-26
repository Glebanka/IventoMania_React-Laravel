import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import { Head } from "@inertiajs/react";

export default function Page( {children} : { children : React.ReactNode } ){
  return(
    <div>
      <Head title="Ивентомания" />
        <Header />
        {children}
      <Footer />
    </div>
  );
};