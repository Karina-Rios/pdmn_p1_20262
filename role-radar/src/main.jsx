import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from '@primereact/core';
import Lara from '@primeuix/themes/lara';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './styles.css';
import App from './components/App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider
      theme={{ preset: Lara }}
    >
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);
