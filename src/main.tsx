import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center;">
        <h1 style="color: #001B3D; margin-bottom: 1rem;">OLYNK</h1>
        <p style="color: #6b7280;">Predict Problems. Automate Decisions.</p>
        <p style="color: #9ca3af; font-size: 0.875rem; margin-top: 2rem;">Loading...</p>
      </div>
    </div>
  `;
}