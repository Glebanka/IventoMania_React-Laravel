import { useContext, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ContentSelectionButtons from "./ContentSelectionButtons";
import UnauthorizedHeaderButtons from "./UnauthorizedHeaderButtons";
import AuthorizedHeaderButtons from "./AuthorizedHeaderButtons";
import Logo from "../Logo";
import { useContent } from "../contexts/ContentContext";

export default function Header(){
  const { props } = usePage();
  const user = props.user;

  return(

    <header className="container flex flex-wrap mt-3 items-center justify-between max-w-7xl">
      <Link href="/">
        <Logo />
      </Link>
      
      {/* Если мы находимся на главной (ContentContext !== undefined) и пользователь не авторизован, то мы выводим кнопки выбора контента */}
      {useContent() !== undefined && user == 'undefined' && <ContentSelectionButtons />}

      {/* Если пользователь не авторизован и он не на главной, выводим стандартный набор функциональных кнопок */}
      {user == 'undefined' && useContent() == undefined && <UnauthorizedHeaderButtons />}

      {/* Если пользователь авторизован, то мы выводим функциональные кнопки для пользователя */}
      {user !== 'undefined' && <AuthorizedHeaderButtons />}

    </header>
  );
};