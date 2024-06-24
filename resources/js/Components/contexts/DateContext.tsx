import { createContext } from 'react';

export interface DateContextProps {
  date: Date;
  setNewDate(): void;
}
export default createContext<DateContextProps | undefined>(undefined);