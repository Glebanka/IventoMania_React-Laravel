import { Link, usePage } from "@inertiajs/react";
import ContentSelectionButtons from "./ContentSelectionButtons";
import UnauthorizedHeaderButtons from "./UnauthorizedHeaderButtons";
import AuthorizedHeaderButtons from "./AuthorizedHeaderButtons";
import Logo from "../Logo";
import { UserProps } from "@/app";

export default function Header(){
  const { props } = usePage<{ user: UserProps | null }>();
  const user = props.user;

  const isIndexPage = window.location.pathname === '/';

  return(

    <header className="container flex sm:flex-col lg:flex-row gap-8 sm:flex-wrap mt-3 items-center justify-between max-w-7xl">
      <Link href="/">
        <Logo />
      </Link>
        {/* Если мы находимся на главной useContent() !== undefined и пользователь не авторизован, то мы выводим кнопки выбора контента */}
        {isIndexPage && !user && <ContentSelectionButtons />}

        {/* Если пользователь не авторизован и он не на главной, выводим стандартный набор функциональных кнопок */}
        {!user && !isIndexPage && <UnauthorizedHeaderButtons />}

        {/* Если пользователь авторизован, то мы выводим функциональные кнопки для пользователя */}
        {user && <AuthorizedHeaderButtons />}
    </header>
  );
};