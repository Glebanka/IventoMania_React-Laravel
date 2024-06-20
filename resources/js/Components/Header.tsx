import { useContext, useState } from "react";
import ContentContext from "./contexts/ContentContext";
import { Link, usePage } from "@inertiajs/react";
import ContentSelectionButtons from "./ContentSelectionButtons";
import AuthorizedHeaderButtons from "./AuthorizedHeaderButtons";
import UnauthorizedHeaderButtons from "./UnauthorizedHeaderButtons";
import Logo from "./Logo";

export default function Header(){
  const { props } = usePage();
  const user = props.user;

  return(

    <header className="container flex flex-wrap mt-3 items-center justify-between max-w-7xl">
      <Link href="/">
        <Logo />
      </Link>
      
      {/* Если мы находимся на главной (ContentContext !== undefined) и пользователь не авторизован, то мы выводим кнопки выбора контента */}
      {useContext(ContentContext) !== undefined && user == 'undefined' && <ContentSelectionButtons />}

      {/* Если пользователь не авторизован и он не на главной, выводим стандартный набор функциональных кнопок */}
      {user == 'undefined' && useContext(ContentContext) == undefined && <UnauthorizedHeaderButtons />}

      {/* Если пользователь авторизован, то мы выводим функциональные кнопки для пользователя */}
      {user !== 'undefined' && <AuthorizedHeaderButtons />}

    </header>
  );
};