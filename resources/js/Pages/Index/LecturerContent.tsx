import { Link } from "@inertiajs/react";

export default function LecturerContent() {
    return (
        <div className="flex flex-col gap-20 mt-20 items-center">
            <div className="flex-col flex container gap-10 max-w-7xl">
                <h2 className="text-center text-5xl">
                    Пространство для <strong>роста</strong> и{" "}
                    <strong>вдохновения</strong>
                </h2>
                <div className="flex xl:flex-row flex-col justify-between align-center">
                    <img
                        className="cardochka w-47.7 self-center"
                        src="/assets/OIG2 1(1).png"
                    ></img>
                    <div className="cardochka w-47.7 flex-col flex sm:justify-between py-8 px-10 self-center xl:self-stretch items-center ">
                        <p className="text-40px mb-3 xl:mb-0 text-center leading-tight">
                            <strong>ИвентоМания</strong> — пространство
                            возможностей, где вы можете делиться своим опытом и
                            вдохновлять других на творчество и самовыражение.
                        </p>

                        <Link href="/login" className="btn w-fit-content">
                            Стать
                            <br />
                            Лектором
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-col flex container gap-10 max-w-7xl">
                <h2 className="text-center text-5xl">
                    Что вы <strong>получите</strong>?
                </h2>
                <div className="flex xl:flex-row flex-col justify-between align-center">
                    <img
                        className="cardochka w-47.7 self-center"
                        src="/assets/OIG2 1(2).png"
                    ></img>
                    <div className="cardochka w-47.7 flex-col flex sm:justify-between py-8 px-10 self-center xl:self-stretch items-center">
                        <p className="text-center text-2xl mb-3 xl:mb-0">
                            Присоединяйтесь к нашей команде экспертов и получите
                            возможность:
                            <br />
                            <br />
                            • Поделиться своими знаниями и навыками с
                            аудиторией, которая ценит и уважает ваш опыт.
                            <br />
                            <br />
                            • Развивать свои профессиональные навыки, улучшая
                            свои методики обучения и коммуникации.
                            <br />
                            <br />
                            • Найти единомышленников среди других лекторов и
                            участников, расширяя свою профессиональную сеть и
                            обмениваясь идеями.
                            <br />
                            <br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
