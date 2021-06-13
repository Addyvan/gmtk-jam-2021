/**
 * The entrypoint to the application
 */
import "./registerComponents";
import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

declare global {
  interface Window { 
    audioManager : any;
    webkitAudioContext : any;
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
