import { useContext, useEffect} from "react";
import{ useDate } from "../contexts/DateContext";
import { Availability } from "@/Pages/Event/Components/RentForm";
import { generateNextFiveDays } from "./Scripts/script";
import { checkAvailability } from "./Scripts/api";
import SmallButton from "./Components/SmallButton";
import BigButton from "./Components/BigButton";

  export default function DateButtons ( {size, availability, setAvailability} :
    {size: string, availability?: Availability, setAvailability?: Function} ){
    // создаем пять значений {currentDate, dayOfWeek, day, month } и отдаем их в новый массив dates 
    const dates = generateNextFiveDays();

    const { setNewDate } = useDate();

    // задаем новое значение контексту date
    const handleDateButtonClick = (event : React.MouseEvent<HTMLButtonElement>, date : Date) => {
      // запрещаем стандартное поведение кнопки (когда она находится в форме, она больше не будет отправлять её)
      event.preventDefault();
      setNewDate(date);
    };

    checkAvailability(availability, setAvailability);
  
    return (<>
      {size == 'small' ? (
          <div className="flex justify-between w-full dateButtons">
            {dates.map((buttonDate, index) => (
              <SmallButton index={index}
              buttonDate={buttonDate}
              handleDateButtonClick={handleDateButtonClick}/>
            ))}
          </div>
        ) : size == 'big' ? (
          <div className="flex gap-2 justify-center">
            {dates.map((buttonDate, index) => (
              <BigButton index={index}
              buttonDate={buttonDate}
              handleDateButtonClick={handleDateButtonClick}/>
            ))}
          </div>
        ) : null}
        </>
    );
  };