import { usePage } from "@inertiajs/react";
import CabinetButton from "./CabinetButton";
import Logo from "./Logo";

export default function Footer(){
  const { props } = usePage();
  const user = props.user;

  return (
    <footer className="container flex flex-wrap mt-24 items-center justify-between max-w-7xl">
      <a href="/">
        <Logo />
      </a>

      <div className="flex w-600px flex-wrap gap-3 justify-center py-3">
        <a href="/about" className="btn text-2xl">О нас</a>
        {user !== 'undefined' && <CabinetButton />}
        {user == 'undefined' && <a href="/login" className="btn text-2xl">Войти</a>}

        <a href="/policy" className="btn text-2xl">Политика конфиденциальности</a>
      </div>
    </footer>
  );
};