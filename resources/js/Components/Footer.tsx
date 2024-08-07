import { Link, usePage } from "@inertiajs/react";
import CabinetButton from "./CabinetButton";
import Logo from "./Logo";
import { UserProps } from "@/app";

export default function Footer(){
  const { props } = usePage<{ user: UserProps | null }>();
  const user = props.user;

  return (
    <footer className="container flex flex-wrap mt-24 items-center justify-between max-w-7xl">
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex w-600px flex-wrap gap-3 justify-center py-3">
        <Link href="/about" className="btn text-2xl">О нас</Link>
        {user && <CabinetButton />}
        {!user && <Link href="/login" className="btn text-2xl">Войти</Link>}

        <Link href="/policy" className="btn text-2xl">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
};