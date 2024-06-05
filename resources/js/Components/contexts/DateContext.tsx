import { createContext } from 'react';

export interface DateContextProps {
  date: string;
  setDate(content: string): void;
}
export default createContext<DateContextProps | undefined>(undefined);