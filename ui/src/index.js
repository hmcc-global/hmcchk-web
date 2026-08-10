import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from 'components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import customTheme from './theme';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
