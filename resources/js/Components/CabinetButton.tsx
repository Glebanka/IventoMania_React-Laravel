import { usePage } from "@inertiajs/react";
import UserSVG from "./SVGs/UserSVG";

export default function CabinetButton(){
  const { props } = usePage();
  const user = props.user;
  return(
    <>
    
    {/* Выводим если тип пользователя Слушатель (id = 1) */}
      {user.user_type_id == 1 && <a href="/cabiner/user" className="flex items-center">
        <div className="flex flex-col items-end justify-between ">
          <p className="text-2xl font-bold text-primary leading-none">{user.fullname}</p>
          <p className="text-xl font-bold text-primary leading-none">Слушатель</p>
        </div>
        <UserSVG></UserSVG>
      </a>}

      {/* Выводим если тип пользователя Лектор (id = 2) */}
      {user.user_type_id == 2 && <a href="/cabinet/lector" className="flex items-center">
        <div className="flex flex-col items-end justify-between ">
          <p className="text-2xl font-bold text-primary leading-none">{user.fullname}</p>
          <p className="text-xl font-bold text-primary leading-none">Лектор</p>
        </div>
        <UserSVG></UserSVG>
      </a>}

    </>
  )
}