import React from "react";

import gameManager from "../GameManager";

const ScoreScreenHUD : React.FC = () => {
    return(
        <div id="score">

            <div className="container is-max-desktop has-text-centered">
                
                <section className="hero">
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text-big">
                            SUCCESS!
                        </p>
                        <p className="subtitle hud-text">
                            SCORE: <span id="score-number">xx</span>
                        </p>
                    </div>
                </section>

                <button className="button is-success" onClick={() => {
                    gameManager.setNextLevel();
                    gameManager.transition("score", "preview");
                }}>
                    NEXT LEVEL
                </button>
            </div>
        </div>
    );
};

export default ScoreScreenHUD;

