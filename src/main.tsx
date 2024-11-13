import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { i18nInstance } from './lib/i18n';
import { initNetlifyIdentity } from './lib/auth/netlifyIdentity';

// Wait for i18n to initialize
i18nInstance.init().then(() => {
  // Create container div for Netlify Identity
  const identityContainer = document.createElement('div');
  identityContainer.id = 'netlify-modal';
  document.body.appendChild(identityContainer);

  // Initialize Netlify Identity
  initNetlifyIdentity();

  // Initialize the root after i18n is ready
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});