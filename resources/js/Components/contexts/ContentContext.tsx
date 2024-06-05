import { createContext } from 'react';

export interface ContentContextProps {
  content: object;
  setContent(content: object): void;
}
export default createContext<ContentContextProps | undefined>(undefined);