import{ useState, ReactNode } from 'react';
import DateContext from '../contexts/DateContext';
interface DateProviderProps {
  children: ReactNode;
}
// Компонент-провайдер, который предоставляет текущую тему и функцию для ее изменения через контекст
export default function DateProvider({ children }: DateProviderProps){
  const [date, setDate] = useState(new Date());
  
  return (
  <DateContext.Provider value={{ date, setDate }}>
    {children}
  </DateContext.Provider>
  );
};