import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import customTheme from './theme';

const onScriptLoaded = () => {
  document.body.removeChild(document.querySelector('[src="https://accounts.google.com/gsi/client"]'));
  document.body.removeChild(document.querySelector('[src="https://accounts.google.com/gsi/select"]'));
  const scriptTag = document.createElement('script');
  const selectScriptTag = document.createElement('script');
  scriptTag.src = "https://accounts.google.com/gsi/client?hl=en";
  selectScriptTag.src = "https://accounts.google.com/gsi/select?hl=en";
  document.body.appendChild(scriptTag);
  document.body.appendChild(selectScriptTag);
};

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} onScriptLoadSuccess={onScriptLoaded}>
    <React.StrictMode>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
