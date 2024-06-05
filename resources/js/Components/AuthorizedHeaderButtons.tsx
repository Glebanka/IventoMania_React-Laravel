import { usePage } from "@inertiajs/react";
import CabinetButton from "./CabinetButton";

export default function AuthorizedHeaderButtons(){
  const { props } = usePage();
  const user = props.user;
  return (
      <div>
        
        {/* Выводим если тип пользователя Слушатель (id = 1) */}
        {user.user_type_id == 1 && <div className="flex gap-3">
          <a href="/events/create" className="btn btn px-4 py-2 mx-auto mt-4 mt-md-0 mx-md-0">Создать<br />мастер-класс</a>
          <CabinetButton />
        </div>}

        {/* Выводим если тип пользователя Лектор (id = 2) */}
        {user.user_type_id == 2 && <div className="flex gap-3">
          <a href="/events/create" className="btn mx-auto mt-4 md:mt-0 md:mx-0 text-xl leading-none">Создать<br />мастер-класс</a>
          <CabinetButton />
        </div>}

      </div>
    );
  }