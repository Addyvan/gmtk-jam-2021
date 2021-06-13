import "./ui/ui.css";
import React, {useState} from "react";

import {AppContainer} from "blengine";
import UI from "./ui/ui";

import AudioManager from "./audio";

import VolumeSlider from "./VolumeSlider";
import main from "./main";

export const isAudioLocked = () => {
    return new Promise(resolve => {
      const checkHTML5Audio = async () => {
        const audio = new Audio();
        try {
          audio.play();
          resolve(false);
        } catch (err) {
          resolve(true);
        }
      };
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        resolve(context.state === 'suspended');
      } catch (e) {
        checkHTML5Audio();
      }
    });
};

const App : React.FC = () => {

    const [started, setStarted] = useState(false);

    return (
        (started) ?
        <div className="parent">
            <div id="ui">
                <UI />
            </div>
            <div id="game-container">
                <AppContainer />
            </div>
        </div>
        :
        <div className="container is-max-desktop is-centered" style={{marginTop: "15vh"}}>
            <section className="hero">
                <div className="hero-body has-text-centered">
                    
                    <p className="title hud-text-big">
                        BLORPH
                    </p>
                    <p className="subtitle hud-text-big">
                        GMTK 2021
                    </p>
                    
                </div>
            </section>
            <div className="columns">
                <div className="column is-one-third">
                    
                </div>
                <div className="column is-one-third">
                    <button className="button is-success is-fullwidth" onClick={() => {
                        main();

                        if (window.audioManager === undefined) {
                            window.audioManager = new AudioManager();
                        }

                        setStarted(true);

                    }}>
                        START GAME
                    </button>
                </div>
                <div className="column is-one-third">
                    
                </div>

            </div>

            <div className="columns">
                <div className="column is-one-third">
                    
                </div>
                <div className="column is-one-third">
                    
                    <VolumeSlider />

                </div>
                <div className="column is-one-third">
                    
                </div>
            </div>

            <div className="columns hud-text">
                <div className="column is-one-third">
                    
                </div>
                <div className="column is-one-third">

                    <article className="message is-info">
                        <div className="message-body" style={{fontSize:"1.5em"}}>
                            MADE BY
                            <br />
                            <br />
                            <a href="https://github.com/cquir">Christian Quirouette</a>
                            <br />
                            <a href="https://github.com/addyvan">Addison van den Hoeven</a>
                        </div>
                    </article>

                </div>
                <div className="column is-one-third">
                    
                </div>
            </div>
        </div>
    );
};

export default App;
