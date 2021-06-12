/**
 * The entrypoint to the application
 */

import "./index.scss";
import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer} from "blengine";

import "./registerComponents";

import main from "./main";

import UI from "./ui/ui";

main();

ReactDOM.render(
  <React.StrictMode>
    <div className="parent">
      <div id="ui">
        <UI />
      </div>
      <div id="game-container">
        <AppContainer />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
