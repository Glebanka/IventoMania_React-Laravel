import { router, useForm, usePage } from "@inertiajs/react";
import DateComponent from "./DateComponent";
import { useEffect, useState } from "react";
import { EventInterface, UserProps } from "@/app";
import ImageInput from "./ImageInput";
import DatePopUp from "./DatePopUp";
import { lecturerCheck, setDateTimeFromInitialData, unconfirmedCheck } from "../Scripts/scripts";
import { useDate } from "@/Components/contexts/DateContext";
import { submit } from "../Scripts/api";

export default function EventForm({initialData} : {initialData: EventInterface | null}) {
  // отслеживание состояния переменной time, по ней мы определяем показывать ли элемент DateComponent
  const [ time, setTime ] = useState(0);

  const {date} = useDate();

  const isEditForm = !!initialData;

  const { props } = usePage<{user: UserProps}>();
  const user = props.user;

  const { data, setData, progress } = useForm({
    name: initialData?.name || '',
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    date: '',
    timeNum: initialData?.time || 0,
    price: initialData?.price || '',
    lecturer_id: user.id,
    file: null,
  });

  // назначаем функцию для изменения параметров в useForm
  const handleChange = (e:any) => {
    setData(e.target.name, e.target.value);
  };

  // Выставляем дату и время в соответсвии с initialData
  setDateTimeFromInitialData(initialData, setTime, setData);

  lecturerCheck(initialData, isEditForm);

  unconfirmedCheck(initialData);

  useEffect(() => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');;
    const day = date.getDate();
    const year = date.getFullYear();
    setData('date', `${year}-${month}-${day}`);
    console.log('сработала дата!');
  }, [date]);
  
  // console.log('дата времени '+ data.timeNum);
  // console.log('состояние времени '+ time);
  // console.log('дата лдатыв '+ data.date);
  // console.log('состояние лдатыв '+ date);


  interface Errors {
    name?: string;
    date?: string;
    short_description?: string;
    description?: string;
    time?: string;
    price?: string;
    file?: string;
  }
  const [errors, setErrors] = useState<Errors>({});
  
  // отслеживание состояния открыт попап или нет
  const [ popUpOpened, setPopUpOpened ] = useState(Boolean);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  // Обработка нажатия на кнопки (спрятать и показать попап)
  const showPopUp = (event : React.MouseEvent<HTMLButtonElement>, popUpOpened : boolean) => {
    event.preventDefault();
    setPopUpOpened(popUpOpened);
    }
    // при открытии попапа убираем возможность прокручивать фон, то есть overflow ставим hidden
    useEffect(() => {
      if (popUpOpened) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          setAnimationTrigger(true);
      }, 10); // Задержка в 10 мс обычно достаточно
      } else {
        document.body.style.overflow = 'auto';
        setAnimationTrigger(false);
      }
    }, [popUpOpened]);
  return(
    <>
    {isEditForm ? (
      <h2 className="text-primary self-center font-bold text-5xl">Редактировать мастер-класс</h2>
    ) : (
      <h2 className="text-primary self-center font-bold text-5xl">Создать мастер-класс</h2>
    )}
    <form className="gap-8 flex flex-col items-center" onSubmit={(e) => submit(e, isEditForm, data, initialData, setErrors)}>
            <div className="flex flex-col gap-3">

              <p className="text-2xl text-primary font-bold">Название</p>
              <input type="text"
              className={`w-[600px] text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.name ? 'bg-red-300' : 'bg-white'}`} 
              placeholder="Введите название" 
              name="name" 
              value={data.name} 
              onChange={handleChange} 
              required 
              autoComplete="name" />
              {errors.name && <strong className="text-red-400">{errors.name}</strong>}
        
            </div>
        
            <div className="flex flex-col gap-3">

              <p className="text-2xl text-primary font-bold">Изображение</p>
        
              <ImageInput initialImagePath={initialData?.imagePath} setData={setData} />
              {errors.file && <strong className="text-red-400">{errors.file}</strong>}
              {progress && (
                <progress value={progress.percentage} max="100">
                  {progress.percentage}%
                </progress>
              )}
            </div>
            
            
            <div className="flex flex-col gap-3">

              <p className="text-2xl text-primary font-bold">Краткое описание</p>
              <textarea
              className={`w-[600px] h-72 text-2xl leading-tight cardochka rounded-55px border-0 font-bold px-11 py-8 ${errors.short_description ? 'bg-red-300' : 'bg-white'}`} 
              placeholder="Введите краткое описание" 
              name="short_description" 
              value={data.short_description} 
              onChange={handleChange} 
              required 
              autoComplete="description" />
              {errors.short_description && <strong className="text-red-400">{errors.short_description}</strong>}
            
            </div>
            
            <div className="flex flex-col gap-3">

              <p className="text-2xl text-primary font-bold">Описание</p>
              <textarea
              className={`w-[600px] h-96 text-2xl leading-tight cardochka rounded-55px border-0 font-bold px-11 py-8 ${errors.description ? 'bg-red-300' : 'bg-white'}`} 
              placeholder="Введите описание" 
              name="description" 
              value={data.description} 
              onChange={handleChange} 
              required 
              autoComplete="description" />
              {errors.description && <strong className="text-red-400">{errors.description}</strong>}
            
            </div>
            
            <div className="flex flex-col gap-3">

              <p className="text-2xl text-primary font-bold">Цена, ₽</p>
              <input type="number"
              className={`w-[600px] text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.price ? 'bg-red-300' : 'bg-white'}`} 
              placeholder="1000" 
              name="price" 
              value={data.price} 
              onChange={handleChange} 
              required />
              {errors.price && <strong className="text-red-400">{errors.price}</strong>}
            
            </div>
            
            
            <div className="flex flex-col gap-3">
              <p className="text-2xl text-primary font-bold">Выберите дату и время</p>
              <button className={`w-[600px] cardochka px-11 ${time !== 0 ? 'py-4' : 'py-8'} flex justify-between items-center`}
              // Включает попап по нажатию
              onClick={(event) => showPopUp(event, true)}>
                <DateComponent time={time}></DateComponent>
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11.25C3 8.8925 3 7.715 3.7325 6.9825C4.465 6.25 5.6425 6.25 8 6.25H23C25.3575 6.25 26.535 6.25 27.2675 6.9825C28 7.715 28 8.8925 28 11.25C28 11.8387 28 12.1337 27.8175 12.3175C27.6337 12.5 27.3375 12.5 26.75 12.5H4.25C3.66125 12.5 3.36625 12.5 3.1825 12.3175C3 12.1337 3 11.8375 3 11.25ZM3 22.5C3 24.8575 3 26.035 3.7325 26.7675C4.465 27.5 5.6425 27.5 8 27.5H23C25.3575 27.5 26.535 27.5 27.2675 26.7675C28 26.035 28 24.8575 28 22.5V16.25C28 15.6612 28 15.3662 27.8175 15.1825C27.6337 15 27.3375 15 26.75 15H4.25C3.66125 15 3.36625 15 3.1825 15.1825C3 15.3662 3 15.6625 3 16.25V22.5Z" fill="black"/>
                  <path d="M9.25 3.75V7.5M21.75 3.75V7.5" stroke="black" stroke-width="2.08333" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            
            {/* Поп-ап для выбора дат, включается по кнопке выше */}
            {popUpOpened == true ? <DatePopUp showPopUp={showPopUp}
            setData={setData}
            setTime={setTime}
            time={time} 
            animationTrigger={animationTrigger}/> : null}

            
            {isEditForm ? (
              <input type="submit" className="btn btn-primary w-fit text-3xl mt-5" value="Сохранить"></input>
            ) : (
              <input type="submit" className="btn btn-primary w-fit text-3xl mt-5" value="Создать"></input>
            )}
            
            {Object.keys(errors).length !== 0 && <strong className="text-red-400">Что-то пошло не так, перепроверьте форму</strong>}
            
          </form>
        </>
  )
}
