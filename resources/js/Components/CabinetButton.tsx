import { Link, usePage } from "@inertiajs/react";
import UserCabinetSVG from "./SVGs/UserCabinetSVG";
import { UserProps } from "@/app";

export default function CabinetButton(){
  const { props } = usePage<{user: UserProps}>();
  const user = props.user;
  return <>
  
  {/* Выводим если тип пользователя Слушатель (id = 1) */}
    {user.user_type_id == 1 && <Link href="/cabinet/user" className="flex items-center">
      <div className="flex flex-col items-end justify-between ">
        <p className="text-2xl font-bold text-primary leading-none">{user.fullname}</p>
        <p className="text-xl font-bold text-primary leading-none">Слушатель</p>
      </div>
      <UserCabinetSVG w={48} h={48}></UserCabinetSVG>
    </Link>}

    {/* Выводим если тип пользователя Лектор (id = 2) */}
    {user.user_type_id == 2 && <Link href="/cabinet/lecturer" className="flex items-center">
      <div className="flex flex-col items-end justify-between">
        <p className="text-2xl font-bold text-primary leading-none">{user.fullname}</p>
        <p className="text-xl font-bold text-primary leading-none">Лектор</p>
      </div>
      <UserCabinetSVG w={48} h={48}></UserCabinetSVG>
    </Link>}

    {/* Выводим если тип пользователя Admin (id = 3) */}
    {user.user_type_id == 3 && <Link href="/cabinet/admin" className="flex items-center">
      <div className="flex flex-col items-end justify-between">
        {/* <p className="text-2xl font-bold text-primary leading-none">{user.fullname}</p> */}
        <p className="text-3xl font-bold text-primary leading-none">Админ</p>
      </div>
      <UserCabinetSVG w={48} h={48}></UserCabinetSVG>
    </Link>}

  </>;
}