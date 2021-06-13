import * as THREE from "three";
import bl from "blengine";

import player from "./player";
import gameManager from "./GameManager";

// states
import GameState from "./states/GameState";
import PreviewState from "./states/PreviewState";
import ScoreScreenState from "./states/ScoreScreenState";
import EndState from "./states/EndState";

// tasks
import loadModels from "./tasks/loadModels";
import createLights from "./tasks/createLights";

async function main() {

    // load models
    await loadModels();
    createLights(bl.scene);


    bl.camera.position.z = 10;
    bl.camera.position.y = 5;

    bl.scene.add(player);

    bl.camera.lookAt(0,0,0);

    gameManager.setState("game", GameState);
    gameManager.setState("preview", PreviewState);
    PreviewState.transitionIn();
    gameManager.setState("score", ScoreScreenState);
    gameManager.setState("end", EndState);

    update();
}

function update() {

    requestAnimationFrame( () => update() );
    let dt : number = bl.clock.getDelta();
    
    gameManager.update(dt);

}

export default main;
