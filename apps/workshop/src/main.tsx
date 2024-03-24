import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@briks/ui';
import './style.css';
import '@briks/ui/styles';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
