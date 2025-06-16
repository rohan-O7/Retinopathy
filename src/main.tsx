import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PatientProvider } from './context/PatientContext.tsx';

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <PatientProvider>
    <App />
    </PatientProvider>
  </StrictMode>
);
