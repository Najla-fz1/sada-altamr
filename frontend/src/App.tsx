import { RouterProvider } from 'react-router-dom';
import { ThemeProvider }  from '@/context/ThemeContext';
import { router }         from '@/routes';
import '@/styles/globals.css';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
