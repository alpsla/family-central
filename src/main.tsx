import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/i18n';
import { initNetlifyIdentity } from './lib/auth/netlifyIdentity';

// Initialize Netlify Identity
initNetlifyIdentity();

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);