import PageLayout from "@/Layouts/PageLayout";
import { router } from "@inertiajs/react";
function handleLogout() {
  router.post(route('logout'));
}
export default function Lecturer(){
  return(
    <PageLayout>
      <div className="container max-w-7xl relative">
        <button className="btn text-lg right-0 absolute py-2 px-5" onClick={handleLogout}>Выйти</button>
      </div>
    </PageLayout>
  )
}