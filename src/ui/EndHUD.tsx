import React from "react";

const EndHUD : React.FC = () => {

    return(
        <div id="end" style={{display: "none", height: "80vh", backgroundColor: "black"}}>
            <div className="container has-text-centered">
                
                <section className="hero">
                    <div className="hero-body has-text-centered">
                        <p className="title hud-text-big">
                            THANK YOU FOR PLAYING!
                        </p>
                        <p>code: https://github.com/Addyvan/gmtk-jam-2021</p>
                    </div>
                </section>
                
            </div>
        </div>
    );

};

export default EndHUD;
