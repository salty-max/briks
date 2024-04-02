import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, TooltipProvider } from '../lib/components/index.tsx';
import '../lib/styles/style.css';
import App from './App.tsx';
import { LocaleProvider } from '../lib/components/locale/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider locale='en'>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
