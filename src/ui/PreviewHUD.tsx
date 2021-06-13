import React from "react";

const PreviewHUD : React.FC = () => {
    return(
        <div id="preview" style={{display: "none"}}>
            <div className="container is-max-desktop has-text-centered">
                
                <section className="hero">
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text-big">
                            REMEMBER THIS SHAPE!
                        </p>
                    </div>
                </section>
                <progress id="preview-timer" className="progress is-info" value="0" max="100">0%</progress>

                <section id="preview-tutorial" className="hero">
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text">
                            <img className="blink_me" src={"icons/mouseLeft.png"} />
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PreviewHUD;
