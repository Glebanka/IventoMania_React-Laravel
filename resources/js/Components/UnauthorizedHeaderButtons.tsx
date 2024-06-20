import { Link } from "@inertiajs/react";

export default function UnauthorizedHeaderButtons(){
  return (
    <div className="flex gap-4">
      <Link href="/login" className="btn mx-auto mt-4 md:mt-0 md:mx-0 text-xl leading-none px-68px flex items-center">Войти</Link>

      <Link href="/events" className="btn mx-auto mt-4 md:mt-0 md:mx-0 text-xl leading-none">Выбрать<br/>Мастер-класс</Link>
    </div>
  );
}