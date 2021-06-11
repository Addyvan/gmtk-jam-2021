/**
 * The entrypoint to the application
 */

import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer} from "blengine";

import "./registerComponents";

import main from "./main";

main();

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
