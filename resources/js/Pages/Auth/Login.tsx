import PageLayout from "@/Layouts/PageLayout";
import { Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect } from "react";

export default function Login(){

  const { data, setData, post, errors, reset } = useForm({
    tel: '',
    password: '',
  });

  const handleChange = (e : any) => {
    setData(e.target.name, e.target.value);
  };

  useEffect(() => {
    return () => {
        reset('password');
    };
  }, []);

    const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return(
    <PageLayout>
    <div className="flex gap-12 flex-col container max-w-7xl mt-20">
      <h2 className="text-primary self-center font-bold text-5xl">Войти</h2>
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

          <p className="text-2xl text-primary font-bold">Пароль</p>
          <input type="password" 
          className={`w-600px text-2xl leading-tight cardochka border-0 font-bold px-11 py-8 ${errors.password ? 'bg-red-300' : 'bg-white'}`} 
          placeholder="q1w2e3r4t5y6" 
          name="password" 
          value={data.password} 
          onChange={handleChange} 
          required 
          autoComplete="new-password" />

          {errors.password && <strong className="text-red-400">{errors.password}</strong>}

        </div> 

        

        <input type="submit" className="btn btn-primary px-5 py-3 w-fit-content text-2xl mt-5" value="Войти"></input>

        <p className="text-primary text-2xl font-bold">или <Link className="underline" href={ route('register') }>Зарегистрироваться</Link></p>


      </form>
  </div>
  </PageLayout>
  );
}