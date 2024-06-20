import { Link } from "@inertiajs/react";

export default function ListenerContent(){

  return(
    <div>
       <div className="flex flex-col gap-20 mt-20 items-center">
        <div className="flex-col flex container gap-10 max-w-7xl">
          <h2 className="text-center text-5xl"><strong>Не просто</strong> мастер-класс</h2>
          <div className="flex xl:flex-row flex-col justify-between align-center">
            <img className="cardochka w-47.7 self-center" src="assets/OIG2 1(1).png"></img>
            <div className="cardochka w-47.7 flex-col flex sm:justify-between py-8 px-10 self-center xl:self-stretch items-center ">

              <p className="text-40px mb-3 xl:mb-0 text-center leading-tight"><strong>ИвентоМания</strong> — праздник творчества, где вы можете раскрыть свой потенциал и <strong>вдохновиться</strong> на создание чего-то <strong>уникального</strong>.</p>

              <Link href="/events" className="btn w-fit-content">Выбрать<br/>Мастер-класс</Link>
            </div>
          </div>
        </div>

        <div className="flex-col flex container gap-10 max-w-7xl">
          <h2 className="text-center text-5xl"><strong>Что</strong> вас <strong>ждет</strong>?</h2>
          <div className="flex xl:flex-row flex-col justify-between align-center">
            <img className="cardochka w-47.7 self-center" src="assets/OIG2 1(2).png"></img>
            <div className="cardochka w-47.7 flex-col flex sm:justify-between py-8 px-10 self-center xl:self-stretch items-center">
              <p className="text-xl mb-3 xl:mb-0">
                <strong>• Сообщество единомышленников:</strong> присоединяйтесь к сообществу творческих людей, обменивайтесь идеями и находите новых друзей.<br/><br/>
                <strong>• Развитие и релакс:</strong> наши мастер-классы помогут вам не только научиться новому, но и отлично провести время и отдохнуть от повседневной суеты.<br/><br/>
                <strong>• Индивидуальный подход:</strong> каждый участник получает внимание и поддержку от опытных наставников.<br/><br/>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-col flex container gap-10 max-w-7xl">
          <h2 className="text-center text-5xl"><strong>Кто</strong> их <strong>ведет</strong>?</h2>
          <div className="flex xl:flex-row flex-col justify-between align-center">
            <img className="cardochka w-47.7 self-center" src="assets/OIG2 1(3).png"></img>
            <div className="cardochka w-47.7 flex-col flex sm:justify-center py-8 px-10 self-center xl:self-stretch gap-2">

              <p className="text-lg mb-3 mb-xl-0 text-indent">
                <strong>Наши наставники</strong> выбираются за их <strong>способность вдохновлять</strong> и <strong>мотивировать</strong> участников, а также за их талант <strong>делиться знаниями</strong> доступным и понятным способом. Они постоянно совершенствуют свои навыки, чтобы предоставлять <strong>актуальные</strong> и <strong>инновационные подходы</strong> в обучении.
              </p>
              <p className="text-lg mb-3 mb-xl-0 text-indent">
                Мы <strong>гордимся</strong> тем, что наши наставники <strong>создают дружелюбную</strong> и <strong>поддерживающую атмосферу</strong> на мастер-классах, где <strong>каждый</strong> может <strong>чувствовать</strong> себя <strong>комфортно</strong>, независимо от уровня своих навыков. Они помогут вам раскрыть ваш творческий потенциал и <strong>достичь новых высот</strong> в изучаемом искусстве или ремесле.
              </p>

            </div>
          </div>
        </div>

        <Link href="/events" className="btn w-fit-content">Выбрать<br/>Мастер-класс</Link>
        </div>
    </div>
  )
}