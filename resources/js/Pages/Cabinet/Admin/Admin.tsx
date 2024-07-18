import { EventInterface } from "@/app";
import PageLayout from "@/Layouts/PageLayout";
import Event from "./Components/Event";
import { router } from "@inertiajs/react";

function handleLogout() {
  router.post(route('logout'));
}
export default function Admin( {events}: {events: EventInterface[]} ){
  return (
      <PageLayout>
        <div className="container max-w-7xl relative">
          <button className="btn text-lg right-0 absolute py-2 px-5" onClick={handleLogout}>Выйти</button>
        </div>
        <div className="flex gap-12 flex-col container max-w-7xl mt-20">
            <p className="text-5xl text-primary font-bold text-center">Список неподтвержденных мастер-классов</p>

            {events.length > 0 ? (
              events.map(event => (
              <>
                <Event event={event} />
              </>
            ))) : (
              <div className="cardochka pb-[528px] pt-8">
                <p className="text-4xl text-center font-bold">Мастер-классов нет</p>
              </div>
            )}
          </div>
      </PageLayout>
  );
}