import { createContext, useContext } from 'react';

export interface ContentContextProps {
  content: string;
  setContent(content: string): void;
}

export const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    return undefined;
  }
  return context;
};