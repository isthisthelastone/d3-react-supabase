import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Error: Root element not found.');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import App from './App.tsx';
