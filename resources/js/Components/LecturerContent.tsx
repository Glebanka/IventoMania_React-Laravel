import { Link } from "@inertiajs/react";

export default function LecturerContent(){

  return(
    <div className="flex flex-col gap-20 mt-20 items-center">

        <div className="flex-col flex container gap-10 max-w-7xl">
          <h2 className="text-center text-5xl">Пространство для роста и вдохновения</h2>
          <div className="flex xl:flex-row flex-col justify-between align-center">
            <img className="cardochka w-47.7 self-center" src="assets/OIG2 1(1).png"></img>
            <div className="cardochka w-47.7 flex-col flex sm:justify-between py-8 px-10 self-center xl:self-stretch items-center ">

              <p className="text-40px mb-3 xl:mb-0 text-center leading-tight">ИвентоМания — пространство возможностей, где вы можете делиться своим опытом и вдохновлять других на творчество и самовыражение.</p>

              <Link href="/login" className="btn w-fit-content">Создать<br/>Мастер-класс</Link>
            </div>
          </div>
        </div>

        <div className="flex-col flex container gap-10 max-w-7xl">
          <h2 className="text-center text-5xl">Что вы получите?</h2>
          <div className="flex xl:flex-row flex-col justify-between align-center">
            <img className="cardochka w-47.7 self-center" src="assets/OIG2 1(2).png"></img>
            <div className="cardochka w-47.7 flex-col flex sm:justify-between py-8 px-10 self-center xl:self-stretch items-center">

              
              <p className="text-xl mb-3 xl:mb-0">
                Присоединяйтесь к нашей команде экспертов и получите уникальную возможность:<br/><br/>
                • Поделиться своими знаниями и навыками с аудиторией, которая ценит и уважает ваш опыт.<br/><br/>
                • Развивать свои профессиональные навыки, улучшая свои методики обучения и коммуникации.<br/><br/>
                • Найти единомышленников среди других лекторов и участников, расширяя свою профессиональную сеть и обмениваясь идеями.<br/><br/>
                • Получать удовольствие от процесса обучения, наблюдая за ростом и успехами ваших учеников.<br/><br/>
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
                Мы выбираем наших лекторов за их страсть к своему делу и способность мотивировать других. Ваш опыт и талант делиться знаниями помогут участникам раскрыть их потенциал и достичь новых высот.
              </p>
              <p className="text-lg mb-3 mb-xl-0 text-indent">
                Мы создаем атмосферу поддержки и сотрудничества, где каждый лектор получает возможность для профессионального роста и развития. Присоединяйтесь к ИвентоМании, чтобы внести свой вклад в развитие творческого сообщества и стать частью уникального образовательного проекта, который вдохновляет и объединяет людей.
              </p>

            </div>
          </div>
        </div>

        <Link href="/login" className="btn w-fit-content">Создать<br/>Мастер-класс</Link>
        </div>
  )
}