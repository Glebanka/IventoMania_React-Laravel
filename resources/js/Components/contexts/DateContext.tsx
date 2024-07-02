import { createContext, useContext } from 'react';

export interface DateContextProps {
  date: Date;
  setNewDate(date : Date): void;
}
export const DateContext =  createContext<DateContextProps | undefined>(undefined);

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};