import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

export interface SVGProps {
  className?: string;
  w?: number;
  h?: number;
  fill?: string;
}
export interface UserProps {
  id: number;
  fullname: string;
  user_type_id: number;
  age: number;
  tel: number;
  email: string;
  seat_id: number;
}

export interface EventInterface {
  id: number;
  name: string;
  datetime: string;
  short_description: string;
  description: string;
  place_id: number;
  price: string;
  confirmed: number;
  lecturer_id: number;
  
  users: UserProps[];
  
  // Названия переменных с бекенда
  isOutDated: boolean;
  seat_id: number;
  time: number;
  date: string;
  imagePath: string;
  formattedDate: string;
  formattedTime: string;
  lecturer: string;
}

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
