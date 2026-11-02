import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from 'components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import customTheme from './theme';
import { Settings } from 'luxon';

// Pinned so dates format the same in the server-rendered HTML and on hydration
Settings.defaultZoneName = 'Asia/Hong_Kong';
Settings.defaultLocale = 'en-HK';

const container = document.getElementById('root');
const app = (
  <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
