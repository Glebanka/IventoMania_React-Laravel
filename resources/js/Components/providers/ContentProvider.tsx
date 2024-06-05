import{ useState, ReactNode } from 'react';
import ContentContext from '../contexts/ContentContext';
interface ContentProviderProps {
  children: ReactNode;
}
// Компонент-провайдер, который предоставляет текущую тему и функцию для ее изменения через контекст
export default function ContentProvider({ children }: ContentProviderProps){
  const [content, setContent] = useState('listener');
  
  return (
  <ContentContext.Provider value={{ content, setContent }}>
    {children}
  </ContentContext.Provider>
);
};