import PageLayout from "@/Layouts/PageLayout";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Register(){
  const { data, setData, post, errors, reset } = useForm({
    tel: '',
    fullname: '',
    age: '',
    email: '',
    pass: '',
    pass_confirmation: '',
    role: '',
  });

  const handleChange = (e : any) => {
    setData(e.target.name, e.target.value);
  };

  useEffect(() => {
    return () => {
        reset('pass', 'pass_confirmation');
    };
  }, []);

    const submit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route('register'));
    };


  return(
    <PageLayout>
    <div className="flex gap-12 flex-col container max-w-7xl mt-20">
      <h2 className="text-primary self-center font-bold text-5xl">Зарегистрироваться</h2>
      <form className="gap-8 flex flex-col items-center" onSubmit={submit}>
        <div className="flex flex-col gap-3">
          
          <p className="text-2xl text-primary font-bold">Номер телефона</p>
          <input type="tel"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold  px-11 py-8 ${errors.tel ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="+79006332423" 
          name="tel" 
          value={data.tel} 
          onChange={handleChange} 
          required 
          autoComplete="tel" />
          {errors.tel && <strong className="text-red-400">{errors.tel}</strong>}

        </div> 

        <div className="flex flex-col gap-3">
          
          <p className="text-2xl text-primary font-bold">ФИО</p>
          <input type="text"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.fullname ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="Иванов Иван Иванович" 
          name="fullname" 
          value={data.fullname} 
          onChange={handleChange} 
          required 
          autoComplete="fullname" />
          {errors.fullname && <strong className="text-red-400">{errors.fullname}</strong>}

        </div> 

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Сколько вам лет?</p>
          <input type="number" 
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.age ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="16" 
          name="age" 
          value={data.age} 
          onChange={handleChange} 
          required 
          autoComplete="age" />
          {errors.age && <strong className="text-red-400">{errors.age}</strong>}

        </div> 

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Email</p>
          <input type="email" 
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.email ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="example@mail.com" 
          name="email" 
          value={data.email} 
          onChange={handleChange} 
          required 
          autoComplete="email webauthn" />

          {errors.email && <strong className="text-red-400">{errors.email}</strong>}

        </div> 

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Пароль</p>
          <input type="password" 
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.pass ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="q1w2e3r4t5y6" 
          name="pass" 
          value={data.pass} 
          onChange={handleChange} 
          required 
          autoComplete="new-password" />

          {errors.pass && <strong className="text-red-400">{errors.pass}</strong>}

        </div> 

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Повторите пароль</p>
          <input type="password" 
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.pass_confirmation ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="q1w2e3r4t5y6" 
          name="pass_confirmation" 
          value={data.pass_confirmation} 
          onChange={handleChange} 
          required 
          autoComplete="new-password"/>
          {errors.pass_confirmation && <strong className="text-red-400">{errors.pass_confirmation}</strong>}

        </div> 

        <div className="flex flex-col gap-3">

          <p className="text-2xl text-primary font-bold">Кто вы?</p>         
          <select name="role"
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.role ? 'bg-red-300' : 'bg-white'}`}
          value={data.role} 
          onChange={handleChange}>
            <option value="1">Слушатель</option>
            <option value="2">Лектор</option>
          </select>
          {errors.role && <strong className="text-red-400">{errors.role}</strong>}

        </div>

        <input type="submit" className="btn btn-primary px-5 py-3 w-fit-content text-2xl mt-5" value="Зарегистрироваться"></input>

        <p className="text-primary text-2xl font-bold">или <Link className="underline" href={ route('login') }>Войти</Link></p>

      </form>
  </div>
  </PageLayout>
  );
};  

