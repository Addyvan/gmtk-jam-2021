import React from "react";

const PreviewHUD : React.FC = () => {
    return(
        <div id="preview">
            <div className="container">
                <span className="hud-text">PREVIEW HUD</span>
                <progress id="preview-timer" className="progress is-info" value="0" max="100">0%</progress>
            </div>
        </div>
    );
};

export default PreviewHUD;
