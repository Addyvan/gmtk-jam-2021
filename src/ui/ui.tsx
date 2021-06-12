import React from "react";

import "./ui.scss";

import GameHUD from "./GameHUD";
import PreviewHUD from "./PreviewHUD";
import ScoreScreenHUD from "./ScoreScreenHUD";

const UI : React.FC = () => {
    return(
        <>

            <GameHUD />
            <PreviewHUD />
            <ScoreScreenHUD />

        </>
    );
}

export default UI;
