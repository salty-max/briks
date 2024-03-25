import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, TooltipProvider } from '../lib/components/index.tsx';
import '../lib/styles/style.css';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
