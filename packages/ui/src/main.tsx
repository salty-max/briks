import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '../lib/components';
import '../lib/styles/style.css';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
