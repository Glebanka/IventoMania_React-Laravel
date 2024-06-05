import PageLayout from "@/Layouts/PageLayout";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateEvent(){
  const { props } = usePage();
  const user = props.user;

  const { data, setData, post, errors } = useForm({
    name: '',
    date: '',
    description: '',
    place_id: '',
    time: '',
    price: '',
    lecturer_id: user.id,
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('createEvent'));
  };

  return(
    <PageLayout>
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
          
          <p className="text-2xl text-primary font-bold">Описание</p>
          <textarea
          className={`w-600px h-80 text-2xl leading-tight cardochka rounded-55px border-0 font-bold px-11 py-8 ${errors.description ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="Введите описание" 
          name="description" 
          value={data.description} 
          onChange={handleChange} 
          required 
          autoComplete="description" />
          {errors.description && <strong className="text-red-400">{errors.description}</strong>}

        </div>

        <div className="flex flex-col gap-3">
          
          <p className="text-2xl text-primary font-bold">Выберите дату</p>
          <input type="date"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.date ? 'bg-red-300' : 'bg-white'}`} 
          name="date" 
          value={data.date} 
          onChange={handleChange} 
          required />
          {errors.date && <strong className="text-red-400">{errors.date}</strong>}

        </div>

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Зона <strong className="text-gray-400">(не отличаются)</strong></p>         
          <select name="place_id"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.place_id ? 'bg-red-300' : 'bg-white'}`}
          value={data.place_id} 
          onChange={handleChange}>

            <option value="" disabled>Выберите зону</option>
            <option value="1">1 зона</option>
            <option value="2">2 зона</option>
            <option value="3">3 зона</option>
          </select>
          {errors.place_id && <strong className="text-red-400">{errors.place_id}</strong>}

        </div>

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Время</p>         
          <select name="time"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.time ? 'bg-red-300' : 'bg-white'}`}
          value={data.time} 
          onChange={handleChange}>
            <option value="" disabled>Выберите время</option>
            <option value="8">8:00-8:50</option>
            <option value="9">9:00-9:50</option>
            <option value="10">10:00-10:50</option>
            <option value="11">11:00-11:50</option>
            <option value="12">12:00-12:50</option>
            <option value="13">13:00-13:50</option>
            <option value="14">14:00-14:50</option>
            <option value="15">15:00-15:50</option>
            <option value="16">16:00-16:50</option>
            <option value="17">17:00-17:50</option>
            <option value="18">18:00-18:50</option>

          </select>
          {errors.time && <strong className="text-red-400">{errors.time}</strong>}

        </div>

        <div className="flex flex-col gap-3">
          
          <p className="text-2xl text-primary font-bold">Цена <strong className="text-gray-400">(в рублях)</strong></p>
          <input type="number"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.price ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="1000" 
          name="price" 
          value={data.price} 
          onChange={handleChange} 
          required />
          {errors.price && <strong className="text-red-400">{errors.price}</strong>}

        </div>
        <input type="submit" className="btn btn-primary w-fit text-3xl mt-5" value="Создать"></input>

      </form>
    </div>
    </PageLayout>
  );
};