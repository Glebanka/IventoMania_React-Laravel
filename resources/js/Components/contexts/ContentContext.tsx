import { createContext, useContext } from 'react';

export interface ContentContextProps {
  content: string;
  setContent(content: string): void;
}

export const ContentContext = createContext<ContentContextProps | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};