import React from "react";

import gameManager from "../GameManager";

const ScoreScreenHUD : React.FC = () => {
    return(
        <div id="score">
            <div className="container">
                <span className="hud-text">SCORE SCREEN</span>
                <button className="button is-success" onClick={() => {
                    gameManager.transition("score", "preview");
                }}>
                    CONTINUE
                </button>

                {/* <table className="game-text">
                    <thead>
                        <tr>
                            <th>Pos</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Addyvan</td>
                            <td>12</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </div>
    );
};

export default ScoreScreenHUD;

