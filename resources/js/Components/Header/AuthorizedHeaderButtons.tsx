import { Link, usePage } from "@inertiajs/react";
import CabinetButton from "../CabinetButton";

export default function AuthorizedHeaderButtons(){
  const { props } = usePage();
  const user = props.user;
  return (
      <div>
        
        {/* Выводим если тип пользователя Слушатель (id = 1) */}
        {user.user_type_id == 1 && <div className="flex gap-3">
          <Link href="/events" className="btn mx-auto mt-4 md:mt-0 md:mx-0 text-xl leading-none">Выбрать<br />мастер-класс</Link>
          <CabinetButton />
        </div>}

        {/* Выводим если тип пользователя Лектор (id = 2) */}
        {user.user_type_id == 2 && <div className="flex gap-3">
          <Link href="/events/create" className="btn mx-auto mt-4 md:mt-0 md:mx-0 text-xl leading-none">Создать<br />мастер-класс</Link>
          <CabinetButton />
        </div>}

      </div>
    );
  }