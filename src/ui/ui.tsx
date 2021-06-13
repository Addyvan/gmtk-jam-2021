import React from "react";

import "./ui.css";

import GameHUD from "./GameHUD";
import PreviewHUD from "./PreviewHUD";
import ScoreScreenHUD from "./ScoreScreenHUD";
import EndHUD from "./EndHUD";

const UI : React.FC = () => {
    return(
        <>

            <GameHUD />
            <PreviewHUD />
            <ScoreScreenHUD />
            <EndHUD />

        </>
    );
}

export default UI;
