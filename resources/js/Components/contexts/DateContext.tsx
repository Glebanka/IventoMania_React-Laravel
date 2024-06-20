import { createContext } from 'react';

export interface DateContextProps {
  date: string;
  setNewDate(content: string): void;
}
export default createContext<DateContextProps | undefined>(undefined);