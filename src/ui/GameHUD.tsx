import React from "react";

const GameHUD : React.FC = () => {

    return(
        <div id="game" style={{display: "none"}}>
            <div className="container is-max-desktop has-text-centered">
                
                <section className="hero">
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text-big">
                            RECONSTRUCT THE SHAPE!
                        </p>
                    </div>
                </section>

                <section id="game-tutorial-1" className="hero" style={{marginTop: "50vh"}}>
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text blink_me">
                            Use W,S,A,D to move around!
                        </p>
                    </div>
                </section>
                
                <section id="game-tutorial-2" className="hero" style={{marginTop: "50vh"}}>
                    <div className="hero-body has-text-centered blink_me">
                        <p className="title hud-text">
                            Q and E to rotate
                        </p>
                        <p className="title hud-text">
                          <img className="blink_me" src={"icons/fightJoy_07.png"} />
                        </p>
                    </div>
                </section>

                <section id="game-tutorial-3" className="hero" style={{marginTop: "50vh"}}>
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text blink_me">
                            SPACE - jump
                        </p>
                    </div>
                </section>
                
            </div>
        </div>
    );

};

export default GameHUD;
