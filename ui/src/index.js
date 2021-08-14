<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from "@chakra-ui/react";
import App from './App';
import reportWebVitals from './reportWebVitals';
=======
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0

ReactDOM.render(
  
  <React.StrictMode>
    <ChakraProvider>
      <App />
<<<<<<< HEAD
      </ChakraProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
=======
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
