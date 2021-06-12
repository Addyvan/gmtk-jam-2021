import * as THREE from "three";
import bl from "blengine";

import player from "./player";
import gameManager from "./GameManager";

// states
import GameState from "./states/GameState";
import PreviewState from "./states/PreviewState";
import ScoreScreenState from "./states/ScoreScreenState";

// tasks
import loadModels from "./tasks/loadModels";
import createLights from "./tasks/createLights";

async function main() {

    // load models
    await loadModels();
    createLights(bl.scene);


    bl.camera.position.z = 15;
    bl.camera.position.y = 7.5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xff0000 } );
    const s = new THREE.Mesh( geometry, material );
    
    player.add(s);
    bl.scene.add(player);

    s.position.set(0, 0.5, 0);

    bl.camera.lookAt(0,0,0);

    gameManager.setState("game", GameState);
    gameManager.setState("preview", PreviewState);
    PreviewState.transitionIn();
    gameManager.setState("score", ScoreScreenState);

    update();
}

function update() {

    requestAnimationFrame( () => update() );
    let dt : number = bl.clock.getDelta();
    
    gameManager.update(dt);

}

export default main;
