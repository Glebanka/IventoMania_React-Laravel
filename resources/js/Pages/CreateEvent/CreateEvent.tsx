import { UserProps } from "@/app";
import DateContext, { DateContextProps } from "@/Components/contexts/DateContext";
import DateButtons from "@/Components/DateButtons";
import DateProvider from "@/Components/providers/DateProvider";
import CloseSVG from "@/Components/SVGs/CloseSVG";
import PageLayout from "@/Layouts/PageLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { FormEventHandler, SetStateAction, useContext, useEffect, useState } from "react";
import ImageInput from "./Components/ImageInput";

interface Availability {
  [key: string]: boolean;
}

function DateComponent({ sendDate } : {sendDate : Function}){
  const context = useContext<DateContextProps | undefined>(DateContext);

  if (!context) {
    throw new Error("DateComponent must be used within a DateProvider");
  }

  let { date } = context;
  const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const month = months[date.getMonth() + 1];
  const monthNumber = (date.getMonth() + 1).toString().padStart(2, '0');;
  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const year = date.getFullYear();

  useEffect(() => {
    let newDate = year + '-' + monthNumber + '-' + day;
    sendDate(newDate);
  }, []); // Пустой массив зависимостей указывает на выполнение только при монтировании и размонтировании
  
  return (
    <div>
      <p>{day + ' ' + month + ', ' + dayOfWeek}</p>
    </div>
  );
};

export default function CreateEvent(){
  const [date, setDate] = useState<Date | null>(null);

  // Функция для обновления состояния на основании данных от дочернего компонента DateComponent
  const handleDataFromChild = (date : Date) => {
    setDate(date);
    setData('date', date.toString());
  };

  // отслеживание состояния переменной time 
  const [ time, setTime ] = useState<string>('');
  // Обработка нажатия на кнопки (поменять значение time на новое)
  const changeTime = (event : React.MouseEvent<HTMLButtonElement>, time : string) => {
    event.preventDefault();
    setTime(time);
    setData('time', time);
    setPopUpOpened(false);
  }


  const { props } = usePage<{user: UserProps}>();
  const user = props.user;

  const { data, setData, progress } = useForm({
    name: '',
    date: '',
    short_description: '',
    description: '',
    time: '',
    price: '',
    lecturer_id: user.id,
    file: null,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setData(e.target.name, e.target.value);
  };

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
  const submit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(route('createEvent'), {
        name: data.name,
        date: data.date,
        short_description: data.short_description,
        description: data.description,
        time: data.time,
        price: data.price,
        lecturer_id: data.lecturer_id,
        file: data.file,
      }, {headers: {
        'Content-Type': 'multipart/form-data',
      }});
      
      const eventId = response.data.event.id;

      // Затем загружаем файл, связанный с этим ивентом
      const formData = new FormData();
      if (data.file !== null) {
        formData.append('file', data.file);
      }
      formData.append('event_id', eventId);

      await axios.post(route('uploadFile'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
    } catch(error : any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        console.error('Ошибка при создании ивента или загрузке файла:', error);
      } else {
        router.visit('/cabinet/lecturer');
      }
    }
  };

  // отслеживание состояния открыт попап или нет
  const [ popUpOpened, setPopUpOpened ] = useState(Boolean);
  // Обработка нажатия на кнопки (спрятать и показать попап)
  const showPopUp = (event : React.MouseEvent<HTMLButtonElement>, popUpOpened : boolean) => {
    event.preventDefault();
    setPopUpOpened(popUpOpened);
    }

  const [availability, setAvailability] = useState<Availability>({});

  // Функция для обновления состояния на основании данных от дочернего компонента DateButtons
  const checkAvailability = (availability: SetStateAction<Availability>) => {
    setAvailability(availability);
  };

  
  
  
  return(
    <PageLayout>
      <DateProvider>
      <>
    
      <div className="flex gap-12 flex-col container max-w-7xl mt-20">
      <h2 className="text-primary self-center font-bold text-5xl">Создать мастер-класс</h2>
      <form className="gap-8 flex flex-col items-center" onSubmit={submit}>

        <div className="flex flex-col gap-3">
          
          <p className="text-2xl text-primary font-bold">Название</p>
          <input type="text"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.name ? 'bg-red-300' : 'bg-white'}`} 
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

          <ImageInput setData={setData} />
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
          className={`w-600px h-72 text-2xl leading-tight cardochka rounded-55px border-0 font-bold px-11 py-8 ${errors.short_description ? 'bg-red-300' : 'bg-white'}`} 
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
          className={`w-600px h-96 text-2xl leading-tight cardochka rounded-55px border-0 font-bold px-11 py-8 ${errors.description ? 'bg-red-300' : 'bg-white'}`} 
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
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.price ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="1000" 
          name="price" 
          value={data.price} 
          onChange={handleChange} 
          required />
          {errors.price && <strong className="text-red-400">{errors.price}</strong>}

        </div>


        <div className="flex flex-col gap-3">
          <p className="text-2xl text-primary font-bold">Выберите дату и время</p>
          <button className={`w-600px cardochka px-11 ${time !== '' ? 'py-4' : 'py-8'} flex justify-between items-center`}
          // Включает попап по нажатию
          onClick={(event) => showPopUp(event, true)}>
            {/* Если time выбрано, то выводит DateComponent с датой внутри и <p> с выводом time */}
              {time !== '' ?
            <div className="flex flex-col text-lg items-center font-bold">
              <DateComponent sendDate={handleDataFromChild} ></DateComponent>
              <p>{time}:00-{time}:50</p>
            </div> :
            // если не выбрано, то просит выбрать
            <p className="font-bold text-2xl">Выберите время</p>
              }
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11.25C3 8.8925 3 7.715 3.7325 6.9825C4.465 6.25 5.6425 6.25 8 6.25H23C25.3575 6.25 26.535 6.25 27.2675 6.9825C28 7.715 28 8.8925 28 11.25C28 11.8387 28 12.1337 27.8175 12.3175C27.6337 12.5 27.3375 12.5 26.75 12.5H4.25C3.66125 12.5 3.36625 12.5 3.1825 12.3175C3 12.1337 3 11.8375 3 11.25ZM3 22.5C3 24.8575 3 26.035 3.7325 26.7675C4.465 27.5 5.6425 27.5 8 27.5H23C25.3575 27.5 26.535 27.5 27.2675 26.7675C28 26.035 28 24.8575 28 22.5V16.25C28 15.6612 28 15.3662 27.8175 15.1825C27.6337 15 27.3375 15 26.75 15H4.25C3.66125 15 3.36625 15 3.1825 15.1825C3 15.3662 3 15.6625 3 16.25V22.5Z" fill="black"/>
              <path d="M9.25 3.75V7.5M21.75 3.75V7.5" stroke="black" stroke-width="2.08333" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
          
          
        {/* Поп-ап, включается по кнопке выше */}
        {popUpOpened == true ? 
        <div className="w-full h-full fixed left-0 top-0 bg-slate-700 bg-opacity-55 z-10 ">
          <div className="fixed top-2/4 right-2/4 translate-x-1/2 -translate-y-1/2 bg-white w-600px h-5/6 rounded-3xl px-6 py-5 flex flex-col gap-9 ">
            <button onClick={(event) => showPopUp(event, false)} className="absolute right-6">
              <CloseSVG />
            </button>
            <p className="text-center text-2xl font-bold">Выберите дату и время</p>
            <div className="flex flex-col gap-5">
              <p className="font-bold text-2xl">Июль</p>
              <DateButtons sendAvailability={checkAvailability} size='small' />
            </div>


            <div className="flex flex-col gap-5">
              <p className="font-bold text-2xl">Утро</p>
              <div className="flex flex-wrap gap-2">
                {['8', '9', '10'].map(timeSlot => (
                  <button
                    key={timeSlot}
                    onClick={(event) => changeTime(event, timeSlot)}
                    className={`${time == timeSlot ? 'btn-small-inactive' : ''} w-44 py-4 text-xl ${availability[timeSlot] ? 'btn-small-unavailable' : 'btn-small'}`}
                    disabled={availability[timeSlot]}
                  >
                    {`${timeSlot}:00-${timeSlot}:50`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold text-2xl">День</p>
              <div className="flex flex-wrap gap-2">
                {['11', '12', '13', '14', '15'].map(timeSlot => (
                  <button
                    key={timeSlot}
                    onClick={(event) => changeTime(event, timeSlot)}
                    className={`${time == timeSlot ? 'btn-small-inactive' : ''} w-44 py-4 text-xl ${availability[timeSlot] ? 'btn-small-unavailable' : 'btn-small'}`}
                    disabled={availability[timeSlot]}
                  >
                    {`${timeSlot}:00-${timeSlot}:50`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-bold text-2xl">Вечер</p>
              <div className="flex flex-wrap gap-2">
                {['16', '17', '18'].map(timeSlot => (
                  <button
                    key={timeSlot}
                    onClick={(event) => changeTime(event, timeSlot)}
                    className={`${time == timeSlot ? 'btn-small-inactive' : ''} w-44 py-4 text-xl ${availability[timeSlot] ? 'btn-small-unavailable' : 'btn-small'}`}
                    disabled={availability[timeSlot]}
                  >
                    {`${timeSlot}:00-${timeSlot}:50`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

         : null}


        <input type="submit" className="btn btn-primary w-fit text-3xl mt-5" value="Создать"></input>

      </form>
    </div>
      </>
      </DateProvider>
    </PageLayout>
  );
};