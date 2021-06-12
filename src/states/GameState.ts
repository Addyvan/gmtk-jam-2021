import bl from "blengine";
import State from "../State";
import loader from "../loader";

// systems
import CollisionSystem from "../systems/CollisionSystem";
import MovementSystem from "../systems/MovementSystem";
import ShapeMovementSystem from "../systems/ShapeMovementSystem";
import SpawnSystem from "../systems/SpawnSystem";

import gameManager, {Timer} from "../GameManager";

const initGameState = () => {
    
    loader.models["floor.glb"].gltf.scene.scale.set(6,6,6);
    bl.scene.add(loader.models["floor.glb"].gltf.scene);

    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
    
    
}

const update = (dt : number) => {
    
    let elem : any = document.getElementById("game-timer");
    if (elem !== undefined && elem !== null) {
        elem.value = ((gameManager.timer.end - gameManager.timer.time) / gameManager.timer.end) * 100;
    }
    
    MovementSystem.update(dt);
    CollisionSystem.update(dt);
    ShapeMovementSystem.update(dt);
    SpawnSystem.update(dt);
}

const render = (dt : number) => {
    bl.renderer.render(bl.scene, bl.camera);
}

const transitionIn = () => {
    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }
    gameManager.timer = new Timer(90);

}

const transitionOut = () => {
    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
}

const GameState = new State(
    update, 
    render,
    transitionIn,
    transitionOut
    );

export default GameState;

export {
    initGameState
};
