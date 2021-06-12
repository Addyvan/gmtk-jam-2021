import React from "react";

const GameHUD : React.FC = () => {

    return(
        <div id="game">
            <div className="container">
                <span className="hud-text">GAME HUD</span>
                <progress id="game-timer" className="progress is-info" value="0" max="100">0%</progress>
            </div>
        </div>
    );

};

export default GameHUD;
