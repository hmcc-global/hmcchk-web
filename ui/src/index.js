import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import customTheme from './theme/index';

const onScriptLoaded = () => {
  // Remove existing scripts if they exist
  const existingClientScript = document.querySelector(
    '[src="https://accounts.google.com/gsi/client"]'
  );
  const existingSelectScript = document.querySelector(
    '[src="https://accounts.google.com/gsi/select"]'
  );

  if (existingClientScript && existingClientScript.parentNode) {
    existingClientScript.parentNode.removeChild(existingClientScript);
  }
  if (existingSelectScript && existingSelectScript.parentNode) {
    existingSelectScript.parentNode.removeChild(existingSelectScript);
  }

  // Add new scripts with language parameter
  const scriptTag = document.createElement('script');
  const selectScriptTag = document.createElement('script');
  scriptTag.src = 'https://accounts.google.com/gsi/client?hl=en';
  selectScriptTag.src = 'https://accounts.google.com/gsi/select?hl=en';
  document.body.appendChild(scriptTag);
  document.body.appendChild(selectScriptTag);
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    onScriptLoadSuccess={onScriptLoaded}
  >
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
