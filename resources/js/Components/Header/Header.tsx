import { Link, usePage } from "@inertiajs/react";
import UnauthorizedHeaderButtons from "./UnauthorizedHeaderButtons";
import AuthorizedHeaderButtons from "./AuthorizedHeaderButtons";
import Logo from "../Logo";
import { UserProps } from "@/app";

export default function Header(){
  const { props } = usePage<{ user: UserProps | null }>();
  const user = props.user;

  return(

    <header className="container flex sm:flex-col lg:flex-row gap-8 sm:flex-wrap mt-3 items-center justify-between max-w-7xl">
      <Link href="/">
        <Logo />
      </Link>

        {/* Если пользователь не авторизован и он не на главной, выводим стандартный набор функциональных кнопок */}
        {!user && <UnauthorizedHeaderButtons />}

        {/* Если пользователь авторизован, то мы выводим функциональные кнопки для пользователя */}
        {user && <AuthorizedHeaderButtons />}
    </header>
  );
};